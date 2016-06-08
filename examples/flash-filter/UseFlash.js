import { Filter } from '../../src';
import cookieParser from 'cookie';
import FlashState from './FlashState';

const FLASH_COOKIE_NAME = '__flash';

const sessionCookieSettings = {
  path: '/',
  domain: 'localhost'
};

export default class UseFlash extends Filter {
  onRequest(req, res, next) {
    let flashContent;
    const cookie = cookieParser.parse(req.headers.cookie || '');

    try {
      flashContent = JSON.parse(cookie[FLASH_COOKIE_NAME]);
    }
    catch (err) {
      flashContent = {};
    }

    req.flashContent = flashContent;
    req.flash = new FlashState();
    next();
  }

  onResponse(req, res, next) {
    const { flash } = req;
    res.cookie(FLASH_COOKIE_NAME, flash.toString(), sessionCookieSettings);
    next();
  }
}
