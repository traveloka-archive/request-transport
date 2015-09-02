import { Page } from 'request-transport';

class Signup extends Page {
  render(req, res, next) {
    switch(req.method) {
      case 'POST': this.onPost(req, res, next); break;
      case 'GET': this.onGet(req, res, next); break;
      default: res.sendStatus(404); break;
    }
  }
  
  onPost(req, res, next) {
    res.redirect(req.router.url('PROFILE', req.locale, { username: req.body.username }));
  }
  
  onGet(req, res, next) {
    let body = 'this is : ' + this.getRouteId() + ' , locale: ' + JSON.stringify(req.locale);
    body += '<form action="' + req.router.url('SIGNUP') + '" method="post">';
    body += '<input type="text" name="username" /><input type="submit" value="register">';
    this.send(req, next, body);
  }
}

export default Signup;