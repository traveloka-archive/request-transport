import express from 'express';
import Immutable from 'immutable';
import BabelPolyfil from 'babel/polyfill'
import FilterFactory from '../filters/FilterFactory';
import ReverseRouter from './ReverseRouter';
import LocaleParser from '../filters/LocaleParser';

class TvRouter {
  constructor() {
    this._app = express();
    
    /* Common Components */
    this._reverseRouter = new ReverseRouter();
    this._filterFactory = new FilterFactory(this._reverseRouter);
    this._router = express.Router();
    
    let localeParser = this._filterFactory.getFilter(LocaleParser.name);
    this._router.use(localeParser.onFilter.bind(localeParser));
  }
  
  register(requestType, protocols, domain, routeId, route, Page) {
    let page = new Page(requestType, protocols, domain, routeId, route);
    let routerArguments = [];
    routerArguments.push(route);
    page.getRequestFilters().forEach(b => {
      let filter = this._filterFactory.getFilter(b.name);
      routerArguments.push(filter.onFilter.bind(filter));
    });
    routerArguments.push(page.render.bind(page));
    page.getResponseFilters().forEach(a => {
      let filter = this._filterFactory.getFilter(a.name);
      routerArguments.push(filter.onFilter.bind(filter));
    });
    Reflect.apply(this._router[requestType], this._router, routerArguments);
    
    this._reverseRouter.register(routeId, page);
  }
  
  start(port) {
    this._app.use(this._router);
    this._app.listen(port);
  }
}

export default TvRouter;