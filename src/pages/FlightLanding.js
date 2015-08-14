import Page from './Page';

class FlightHome extends Page {
  render(req, res, next) {
    this.send(req, next, 'this is : ' + this.routeId + ' , locale: ' + JSON.stringify(req.locale));
  }
}

export default FlightHome;