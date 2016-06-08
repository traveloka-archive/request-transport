class Page {
  constructor(routeId, requestType, protocols, route, domains) {
    this.filters = [];

    this._routeId = routeId;
    this._requestType = requestType;
    this._protocols = protocols;
    this._route = route;
    this._domains = domains;
    this._protocolMap = {};
    protocols.forEach(p => {
      this._protocolMap[p] = true;
    });
  }

  getDomain(locale, protocol) {
    let domain = this._domains.get(locale);
    if (domain === undefined) {
      throw new Error(`Page: ${this.name} does not have locale: ${locale}`);
    }
    if (!this._protocolMap.hasOwnProperty(protocol)) {
      protocol = this._protocols[0];
    }
    return `${protocol}://${domain.domain}`;
  }

  getRouteId() {
    return this._routeId;
  }

  getRoute() {
    return this._route;
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
