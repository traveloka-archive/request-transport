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
    this._router = express.Router();

    // Default parser
    this._router.use(bodyParser.urlencoded({ extended: false }));
    this._router.use(bodyParser.json());
  }

  register(routeId, requestTypes, protocols, route, Page, domains) {
    domains = domains || this._defaultDomains;

    // Make sure they are array
    requestTypes = requestTypes.constructor !== Array ? [requestTypes] : requestTypes;
    protocols = protocols.constructor !== Array ? [protocols] : protocols;

    let page = new Page(routeId, requestTypes, protocols, route, domains);
    let routerArguments = [];
    routerArguments.push(route);
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
      requestTypes.forEach(requestType => {
        Function.prototype.apply.call(this._router[requestType], this._router, routerArguments);
      });
    }

    this._reverseRouter.register(routeId, page);
  }

  start(port) {
    this._app.use(this._router);
    this._app.listen(port);
  }
}

export default Router;
