class Page {
  constructor(requestType, routeId, route) {
    this.requestType = requestType;
    this.routeId = routeId;
    this.route = route;
    this.before = [];
    this.after = [this.postRender];
  }
  
  render(req, res, next) {
    next();
  }
  
  postRender(req, res, next) {
    res.send(req._responseBody);
  }
  
  send(req, next, body) {
    req._responseBody = body;
    next();
  }
}

export default Page;