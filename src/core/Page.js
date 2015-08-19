import Sender from '../filters/Sender';
import Immutable from 'immutable';

class Page {
  constructor(requestType, protocols, domains, routeId, route) {
    this._requestType = requestType;
    this._protocols = protocols;
    this._domains = this._parseDomains(domains);
    this._routeId = routeId;
    this._route = route;
    this._initDefaultFilters();
  }
  
  _parseDomains(domains) {
    let parsedDomain = {
      domains: Immutable.OrderedMap(),
      locales: Immutable.OrderedMap()
    };
    domains.forEach(domain => {
      parsedDomain.domains = parsedDomain.domains.set(domain.locale, domain.domain);
      parsedDomain.locales = parsedDomain.locales.set(domain.domain, domain.locale);
    });
    return parsedDomain;
  }
  
  _initDefaultFilters() {
    this._requestFilters = [];
    this._responseFilters = [Sender];
  }
  
  getRouteId() {
    return this._routeId;
  }
  
  getDomain(locale) {
    let domain = this._domains.domains.get(locale);
    if(domain === undefined) {
      throw 'Page: ' + this.name + ' does not have locale: ' + locale;
    }
    return this._protocols[0] + '://' + domain;
  }
  
  getLocale(domain) {
    let locale = this._domains.locales.get(domain);
    if(locale === undefined) {
      throw 'Page: ' + this.name + ' does not have domain: ' + domain;
    }
  }
  
  getLocales() {
    return this._domains.domains.keySeq();
  }
  
  getRoute() {
    return this._route;
  }
  
  getRequestFilters() {
    return this._requestFilters;
  }
  
  getResponseFilters() {
    return this._responseFilters;
  }
  
  render(req, res, next) {
    next();
  }
  
  send(req, next, body) {
    req.responseBody = body;
    next();
  }
}

export default Page;