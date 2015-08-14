import express from 'express';
import LocaleParser from './LocaleParser';
import BabelPolyfil from 'babel/polyfill'
import Immutable from 'immutable';

class TvRouter {
  constructor() {
    this.app = express();
    this.localeParser = new LocaleParser();
    this.router = express.Router();
    this.router.use(this.localeParser.parseLocale.bind(this.localeParser));
    this.routes = Immutable.OrderedMap();
  }
  
  register(requestType, routeId, route, Page) {
    let page = new Page(requestType, routeId, route);
    let routerArguments = [];
    routerArguments.push(route);
    page.before.forEach(b => {
      routerArguments.push(b.bind(page));
    });
    routerArguments.push(page.render.bind(page));
    page.after.forEach(a => {
      routerArguments.push(a.bind(page));
    });
    Reflect.apply(this.router[requestType], this.router, routerArguments);
    
    this.localeParser.register(routeId, page);
  }
  
  start(port) {
    this.app.use(this.router);
    this.app.listen(port);
  }
}

export default TvRouter;