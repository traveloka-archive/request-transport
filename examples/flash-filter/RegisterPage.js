import { Page } from '../../src';
import UseFlash from './UseFlash';

export default class RegisterPage extends Page {
  constructor() {
    super(...arguments);

    this.filters.push(UseFlash);
  }

  render(req, res, next) {
    const { flashContent } = req;
    const message = flashContent['message'] || 'register here';
    UseFlash.onResponse(req, res);
    return this.send(req, next, message);
  }
}
