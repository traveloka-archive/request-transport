import express from 'express';
import FilterFactory from '../core/FilterFactory';
import ReverseRouter from './ReverseRouter';
import bodyParser from 'body-parser';
import asInterceptor from './asInterceptor';

class Router {
  constructor(domains) {
    this._app = express();
    this._defaultDomains = domains;

    /* Common Components */
    this._reverseRouter = new ReverseRouter();
    this._filterFactory = new FilterFactory(this._reverseRouter);

    // Default parser
    this._app.use(bodyParser.urlencoded({ extended: false }));
    this._app.use(bodyParser.json());

    this._routers = {};
  }

  get expressApp() {
    return this._app;
  }

  get expressRouters() {
    return this._routers;
  }

  register(routeId, requestTypes, protocols, route, Page, domains) {
    domains = domains || this._defaultDomains;

    // Make sure they are array
    requestTypes = requestTypes.constructor !== Array ? [requestTypes] : requestTypes;
    protocols = protocols.constructor !== Array ? [protocols] : protocols;

    const page = new Page(routeId, requestTypes, protocols, route, domains);
    const routerArguments = [];

    routerArguments.push(route);
    routerArguments.push((req, res, next) => {
      req.currentPage = page;
      next();
    });

    page.filters.forEach(FilterClass => {
      const filter = this._filterFactory.getFilter(FilterClass);
      routerArguments.push(filter.onRequest.bind(filter));
    });

    // We passed in onResponse filter in reverse to make filter execution
    // follow A.req, B.req, B.res, A.res
    //
    // Note that this onResponse filter is also put before page.render,
    // to make sure we can properly intercept the end response. Using
    // asInterceptor allow us to "delay" this filter execution until right
    // before response will be sent to client
    page.filters.reverse().forEach(FilterClass => {
      const filter = this._filterFactory.getFilter(FilterClass);
      const responseFilter = filter.onResponse.bind(filter);
      routerArguments.push(asInterceptor(responseFilter));
    });

    routerArguments.push(page.render.bind(page));
    routerArguments.push((req, res) => {
      // Incorrect naming, to support stream
      if (typeof req.responseBody === 'function') {
        req.responseBody();
      }
      else {
        res.send(req.responseBody);
      }
    });

    if (requestTypes.length > 1 && requestTypes.indexOf('all') !== -1) {
      throw new Error('requestType: "all" cannot be combined with other requests');
    } else {
      domains.forEach(domain => {
        let router = this._routers[domain.host];
        if (router === undefined) {
          router = this._routers[domain.host] = express.Router();
        }
        requestTypes.forEach(requestType => {
          Function.prototype.apply.call(router[requestType], router, routerArguments);
        });
      });
    }

    this._reverseRouter.register(routeId, page);
  }

  start(port, opt_callback) {
    this._app.use((req, res, next) => {
      const host = req.headers.host || req.hostname;
      if (this._routers.hasOwnProperty(host)) {
        this._routers[host](req, res, next);
      } else {
        console.error(`Host "${host}" is not found in Router`);
        res.status(404).send();
      }
    });
    return this._app.listen(port, opt_callback);
  }
}

export default Router;
