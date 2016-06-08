import { Page } from '../../src';
import UseFlash from './UseFlash';

export default class HomePage extends Page {
  constructor() {
    super(...arguments);

    this.filters.push(UseFlash);
  }

  render(req, res, next) {
    req.flash.set('message', 'register first');
    return res.redirect('/register');
  }
}
