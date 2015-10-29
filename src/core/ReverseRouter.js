import Immutable from 'immutable';
import pathToRegexp from 'path-to-regexp';

class ReverseRouter {
  constructor() {
    this._pages = Immutable.Map();
  }

  register(pageId, page) {
    if (this._pages.get(pageId) === undefined) {
      this._pages = this._pages.set(pageId, page);
    } else {
      throw new Error(`Duplicate pageId ${pageId}`);
    }
  }

  url(pageId, locale, params = {}, queryString = {}) {
    let page = this._pages.get(pageId);
    if (page === undefined) {
      throw new Error(`pageId: ${pageId} not found.`);
    }
    let host = page.getDomain(locale);
    let rawRoute = page.getRoute();
    let toPath = pathToRegexp.compile(rawRoute);
    let route = toPath(params);
    let qs = '';
    for (var key in queryString) {
      if (queryString.hasOwnProperty(key)) {
        qs += `&${key}=${queryString[key]}`;
      }
    }
    qs = qs.replace('&', '?');
    return host + route + qs;
  }
}

export default ReverseRouter;
