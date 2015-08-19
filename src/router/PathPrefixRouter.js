import Router from '../core/Router';
import Immutable from 'immutable';

class PathPrefixRouter extends Router {
  constructor(host, locales) {
    super();
    this._router.use(this.parseLocale.bind(this));
    this._domains = Immutable.OrderedMap();
    locales.forEach(locale => {
      this._domains = this._domains.set(locale, {
        locale: locale,
        domain: host + '/' + locale
      });
    });
  }
  
  register(routeId, requestTypes, protocols, route, Page) {
    super.register(routeId, requestTypes, protocols, route, Page, this._domains);
  }
  
  parseLocale(req, res, next) {
    let urlParts = req.url.split('/');
    if(urlParts.length > 0) {
      let localeCandidate = this._domains.get(urlParts[1]);
      if(localeCandidate !== undefined) {
        req.locale = localeCandidate.locale;
        req.url = req.url.substr(req.locale + 1);
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