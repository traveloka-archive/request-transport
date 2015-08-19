import Router from '../core/Router';
import Immutable from 'immutable';

class DomainRouter extends Router {
  constructor() {
    super();
    this._router.use(this.parseLocale.bind(this));
    this._locales = Immutable.OrderedMap();
  }
  
  register(requestType, protocols, domains, routeId, route, Page) {
    super.register(requestType, protocols, domains, routeId, route, Page);
    domains.forEach(domain => {
      this._locales = this._locales.set(domain.domain, domain.locale);
    });
  }
  
  parseLocale(req, res, next) {
    let locale = this._locales.get(req.hostname);
    if(locale === undefined) {
      locale = this._locales.first();
    }
    req.locale = locale;
    req.router = this._reverseRouter;
    next();
  }
}

export default DomainRouter;