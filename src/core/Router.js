import express from 'express';
import Immutable from 'immutable';
import FilterFactory from '../core/FilterFactory';
import ReverseRouter from './ReverseRouter';

class Router {
  constructor() {
    this._app = express();
    
    /* Common Components */
    this._reverseRouter = new ReverseRouter();
    this._filterFactory = new FilterFactory(this._reverseRouter);
    this._router = express.Router();
  }
  
  register(routeId, requestTypes, protocols, route, Page, domains) {
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
    
    if(requestTypes.length > 1 && requestTypes.indexOf('all') !== -1) {
      throw 'requestType: "all" should stand alone';
    }
    else {
      requestTypes.forEach(requestType => {
        Function.apply(this._router[requestType], this._router, routerArguments);
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