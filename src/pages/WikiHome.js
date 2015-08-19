import Page from '../core/Page';

class WikiHome extends Page {
  render(req, res, next) {
    let body = '<br><a href="' + req.router.url('WIKI_HOME', 'id') + '">wikipedia indonesia</a>';
    this.send(req, next, body);
  }
}

export default WikiHome;