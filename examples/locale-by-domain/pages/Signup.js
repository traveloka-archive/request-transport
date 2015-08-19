import { Page } from 'request-transport';

class Signup extends Page {
  render(req, res, next) {
    switch(req.method) {
      case 'post': this.onPost(req, res, next); break;
      case 'get': this.onGet(req, res, next); break;
    }
  }
  
  onPost(req, res, next) {
    res.redirect(req.router.url('PROFILE', req.locale, { username: req.body.username }));
  }
  
  onGet(req, res, next) {
    let body = 'this is : ' + this.getRouteId() + ' , locale: ' + JSON.stringify(req.locale);
    body += '<form action="' + req.router.url('SIGNUP', req.locale) + '" method="post">';
    body += '<input type="text" name="username" /><input type="submit" value="register">';
    this.send(req, next, body);
  }
}

export default Signup;