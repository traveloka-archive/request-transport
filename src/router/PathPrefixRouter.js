import Router from '../core/Router';
import Immutable from 'immutable';
import ReverseRouterFacade from '../core/ReverseRouterFacade';

class PathPrefixRouter extends Router {
  constructor(host, locales, defaultLocale) {
    let domains = Immutable.OrderedMap();
    let isDefaultLocaleFound = false;

    if(locales == null || locales.length === 0) {
      throw new Error('locales cannot be null nor empty array');
    }
    if(defaultLocale != null && locales.indexOf(defaultLocale) === -1) {
      throw new Error('Locale ' + defaultLocale + ' is not defined in locales');
    }

    locales.forEach(locale=> {
      let domain;

      if(locale === defaultLocale) {
        domain = host;
      }
      else {
        domain = host + '/' + locale;
      }
      domains = domains.set(locale, {
        locale: locale,
        domain: domain
      });
    });

    super(domains);

    if(defaultLocale != null) {
      this._defaultDomain = this._defaultDomains.get(defaultLocale);
    }
    this._router.use(this.parseLocale.bind(this));
  }
  
  register(routeId, requestTypes, protocols, route, Page, domains) {
    super.register(routeId, requestTypes, protocols, route, Page, domains);
  }
  
  parseLocale(req, res, next) {
    let urlParts = req.url.split('/');
    if(urlParts.length > 0) {
      let localeCandidate = this._defaultDomains.get(urlParts[1]);
      if(localeCandidate !== undefined) {
        req.locale = localeCandidate.locale;
        req.url = req.url.substr(req.locale.length + 1);
        if(req.url.length === 0) {
          req.url = '/';
        }
      }
    }
    if(req.locale === undefined) {
      req.locale = this._defaultDomain.locale;
    }
    let reverseRouter = new ReverseRouterFacade(this._reverseRouter, req.locale);
    req.router = reverseRouter;
    next();
  }
}

export default PathPrefixRouter;