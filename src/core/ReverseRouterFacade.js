class ReverseRouterFacade {
  constructor(reverseRouter, locale, protocol) {
    this._protocol = protocol;
    this._reverseRouter = reverseRouter;
    this._locale = locale;
  }

  url(pageId, params, locale = this._locale, protocol = this._protocol) {
    return this._reverseRouter.url(pageId, locale, params, protocol);
  }

  urlWithLocale(pageId, locale, protocol = this._protocol) {
    return this._reverseRouter.url(pageId, locale, undefined, protocol);
  }
}

export default ReverseRouterFacade;
