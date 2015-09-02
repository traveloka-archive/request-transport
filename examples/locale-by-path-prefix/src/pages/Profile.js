import { Page } from 'request-transport';

class Profile extends Page {
  render(req, res, next) {
    let body = 'this is : ' + this.getRouteId() + ' , locale: ' + JSON.stringify(req.locale);
    body += '<br>Your username is ' + req.params.username;
    body += '<br><a href="' + req.router.url('HOME') + '">home</a>';
    this.send(req, next, body);
  }
}

export default Profile;