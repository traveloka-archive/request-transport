import Page from '../core/Page';
import PageName from '../const/PageName';

class Landing extends Page {
  render(req, res, next) {
    let body = 'this is : ' + this.getRouteId() + ' , locale: ' + JSON.stringify(req.locale);
    body += '<br><a href="' + req.router.url(PageName.FLIGHT_LANDING, req.locale) + '">flight landing</a>'
    this.send(req, next, body);
  }
}

export default Landing;