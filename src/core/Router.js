import express from 'express';
import FilterFactory from '../core/FilterFactory';
import ReverseRouter from './ReverseRouter';
import bodyParser from 'body-parser';

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

    let page = new Page(routeId, requestTypes, protocols, route, domains);
    let routerArguments = [];
    routerArguments.push(route);
    routerArguments.push((req, res, next) => {
      req.currentPage = page;
      next();
    });
    page.getRequestFilters().forEach(b => {
      let filter = this._filterFactory.getFilter(b);
      routerArguments.push(filter.onFilter.bind(filter));
    });
    routerArguments.push(page.render.bind(page));
    page.getResponseFilters().forEach(a => {
      let filter = this._filterFactory.getFilter(a);
      routerArguments.push(filter.onFilter.bind(filter));
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

  start(port) {
    this._app.use((req, res, next) => {
      let host = req.hostname;
      if (this._routers.hasOwnProperty(host)) {
        this._routers[host](req, res, next);
      } else {
        console.error(`Host "${host}" is not found in Router`);
        res.status(404).send();
      }
    });
    this._app.listen(port);
  }
}

export default Router;
