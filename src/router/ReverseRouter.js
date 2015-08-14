import Immutable from 'immutable';

class ReverseRouter {
  constructor() {
    this.pages = Immutable.OrderedMap();
  }
  
  register(pageId, page) {
    if(this.pages.get(pageId) === undefined) {
      this.pages = this.pages.set(pageId, page);
    }
  }
  
  url(pageId, locale, urlMap) {
    let page = this.pages.get(pageId);
    let host = page.getHost();
    let route = page.getRoute();
    return host + locale.routePrefix + route;
  }
}

export default ReverseRouter;