import LocaleParser from '../filters/LocaleParser';
import Sender from '../filters/Sender';

class Page {
  constructor(requestType, protocols, domain, routeId, route) {
    this._requestType = requestType;
    this._protocols = protocols;
    this._domain = domain;
    this._routeId = routeId;
    this._route = route;
    this._initDefaultFilters();
  }
  
  _initDefaultFilters() {
    this._requestFilters = [LocaleParser];
    this._responseFilters = [Sender];
  }
  
  getRouteId() {
    return this._routeId;
  }
  
  getHost() {
    return this._protocols[0] + '://' + this._domain;
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