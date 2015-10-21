import Router from '../core/Router';
import Immutable from 'immutable';

class DomainRouter extends Router {
  constructor(domainList) {
    let domains = Immutable.OrderedMap();
    let domainsByHostname = Immutable.OrderedMap();
    domainList.forEach(d => {
      let domain = {
        locale: d.locale,
        domain: d.domain
      };
      domains = domains.set(domain.locale, domain);
      domainsByHostname = domainsByHostname.set(domain.domain, domain);
    });
    super(domains);
    this._router.use(this.parseLocale.bind(this));
    this._domainsByHostname = domainsByHostname;
  }

  register(routeId, requestTypes, protocols, route, Page, domains) {
    super.register(routeId, requestTypes, protocols, route, Page, domains);
  }

  parseLocale(req, res, next) {
    let domain = this._domainsByHostname.get(req.hostname);
    if (domain === undefined) {
      domain = this._domainsByHostname.first();
    }
    req.locale = domain.locale;
    req.router = this._reverseRouter;
    next();
  }
}

export default DomainRouter;
