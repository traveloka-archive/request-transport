import Page from './Page';
import PageName from './PageName';

class Landing extends Page {
  render(req, res, next) {
    let body = 'this is : ' + this.routeId + ' , locale: ' + JSON.stringify(req.locale);
    body += '<br><a href="' + req.router.url(PageName.FLIGHT_LANDING, req.locale) + '">flight landing</a>'
    this.send(req, next, body);
  }
}

export default Landing;