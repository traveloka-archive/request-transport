import Router from '../core/Router';
import Immutable from 'immutable';

class PathPrefixRouter extends Router {
  constructor(host, locales) {
    let domains = Immutable.OrderedMap();
    locales.forEach(locale => {
      domains = domains.set(locale, {
        locale: locale,
        domain: host + '/' + locale
      });
    });
    super(domains);
    this._router.use(this.parseLocale.bind(this));
  }
  
  register(routeId, requestTypes, protocols, route, Page, domains) {
    super.register(routeId, requestTypes, protocols, route, Page, domains);
  }
  
  parseLocale(req, res, next) {
    let urlParts = req.url.split('/');
    if(urlParts.length > 0) {
      let localeCandidate = this._domains.get(urlParts[1]);
      if(localeCandidate !== undefined) {
        req.locale = localeCandidate.locale;
        req.url = req.url.substr(req.locale.length + 1);
        if(req.url.length === 0) {
          req.url = '/';
        }
      }
    }
    if(req.locale === undefined) {
      req.locale = this._domains.first().locale;
    }
    req.router = this._reverseRouter;
    next();
  }
}

export default PathPrefixRouter;