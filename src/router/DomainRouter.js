import Router from '../core/Router';
import Immutable from 'immutable';

class DomainRouter extends Router {
  constructor(domains) {
    super();
    this._router.use(this.parseLocale.bind(this));
    this._domains = Immutable.OrderedMap();
    domains.forEach(domain => {
      this._domains = this._domains.set(domain.domain, {
        locale: domain.locale,
        domain: domain.domain
      })
    });
  }
  
  register(routeId, requestTypes, protocols, route, Page) {
    super.register(routeId, requestTypes, protocols, route, Page, this._domains);
  }
  
  parseLocale(req, res, next) {
    let domain = this._domains.get(req.hostname);
    if(domain === undefined) {
      domain = this._domains.first();
    }
    req.locale = domain.locale;
    req.router = this._reverseRouter;
    next();
  }
}

export default DomainRouter;