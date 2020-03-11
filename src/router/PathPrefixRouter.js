import Router from '../core/Router';
import Immutable from 'immutable';
import ReverseRouterFacade from '../core/ReverseRouterFacade';

class PathPrefixRouter extends Router {
  constructor(host, locales, defaultLocale, customConfig) {
    let domains = PathPrefixRouter.createDomainMap(host, locales, defaultLocale);

    super(domains);

    this._customConfig = customConfig;
    if (defaultLocale !== null && defaultLocale !== undefined) {
      this._defaultDomain = this._defaultDomains.get(defaultLocale);
    }
    this._app.use(this.parseLocale.bind(this));
  }

  static createDomainMap(host, locales, defaultLocale) {
    let domains = Immutable.OrderedMap();
    let localesExist = locales !== null && locales !== undefined;
    if (!localesExist || locales.length === 0) {
      throw new Error('locales cannot be null nor empty array');
    }
    if (localesExist && locales.indexOf(defaultLocale) === -1) {
      throw new Error(`Locale ${defaultLocale} is not defined in locales`);
    }

    locales.forEach(locale => {
      let domain;
      let shouldUseLongPrefix = this._customConfig && this._customConfig.shouldUseLongPrefix;
      if (locale === defaultLocale && !shouldUseLongPrefix) {
        domain = host;
      } else {
        domain = `${host}/${locale}`;
      }
      domains = domains.set(locale, {
        locale,
        domain,
        host
      });
    });
    return domains;
  }

  parseLocale(req, res, next) {
    let urlParts = req.url.split('/');
    if (urlParts.length > 0) {
      let localePrefix = urlParts[1].split('?')[0];
      let localeCandidate = this._defaultDomains.get(localePrefix);
      if (localeCandidate !== undefined) {
        req.locale = localeCandidate.locale;
        req.url = req.url.substr(req.locale.length + 1);
        if (req.url[0] !== '/') {
          req.url = `/${req.url}`;
        }
      }
    }
    if (req.locale === undefined) {
      req.locale = this._defaultDomain.locale;
    }
    let reverseRouter = new ReverseRouterFacade(this._reverseRouter, req.locale, req.get('X-Forwarded-Proto'));
    req.router = reverseRouter;
    next();
  }

  register(host, locales, defaultLocale, registerCallback) {
    let domains = PathPrefixRouter.createDomainMap(host, locales, defaultLocale);
    registerCallback((routeId, requestTypes, protocols, route, Page) => {
      super.register(routeId, requestTypes, protocols, route, Page, domains);
    });
  }
}

export default PathPrefixRouter;
