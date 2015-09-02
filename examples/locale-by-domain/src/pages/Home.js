import { Page } from 'request-transport';

class Home extends Page {
  render(req, res, next) {
    let body = 'this is : ' + this.getRouteId() + ' , locale: ' + JSON.stringify(req.locale);
    body += '<br><a href="' + req.router.urlWithLocale('HOME', 'en') + '">English Site</a>';
    body += '<br><a href="' + req.router.urlWithLocale('HOME', 'id') + '">Indonesia Site</a>';
    this.send(req, next, body);
  }
}

export default Home;