import FilterFactory from '../core/FilterFactory';
import Router from '../core/Router';
import Immutable from 'immutable';

class PathPrefixRouter extends Router {
  constructor() {
    super();
    this._router.use(this.parseLocale.bind(this));
    this._locales = Immutable.OrderedSet();
  }
  
  register(requestType, protocols, domains, routeId, route, Page) {
    super.register(requestType, protocols, domains, routeId, route, Page);
    domains.forEach(domain => {
      this._locales = this._locales.add(domain.locale);
    });
  }
  
  parseLocale(req, res, next) {
    let urlParts = req.url.split('/');
    if(urlParts.length > 0) {
      let localeCandidate = urlParts[1];
      if(this._locales.contains(localeCandidate)) {
        req.locale = localeCandidate;
        req.url = req.url.substr(localeCandidate.length + 1);
        if(req.url.length === 0) {
          req.url = '/';
        }
      }
    }
    if(req.locale === undefined) {
      req.locale = this._locales.first();
    }
    req.router = this._reverseRouter;
    next();
  }
}

export default PathPrefixRouter;