import Page from '../core/Page';

class FlightHome extends Page {
  render(req, res, next) {
    this.send(req, next, 'this is : ' + this.getRouteId() + ' , locale: ' + JSON.stringify(req.locale));
  }
}

export default FlightHome;