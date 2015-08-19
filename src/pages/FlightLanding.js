import Page from '../core/Page';

class FlightHome extends Page {
  render(req, res, next) {
    let body = 'this is : ' + this.getRouteId() + ' , locale: ' + JSON.stringify(req.locale);
    body += '<br><a href="' + req.router.url('LANDING', req.locale) + '">home</a>';
    this.send(req, next, body);
  }
}

export default FlightHome;