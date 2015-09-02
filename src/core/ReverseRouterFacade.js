class ReverseRouterFacade {
  constructor(reverseRouter, locale) {
    this._reverseRouter = reverseRouter;
    this._locale = locale;
  }

  url(pageId, params, locale) {
    locale = locale || this._locale;
    return this._reverseRouter.url(pageId, locale, params);
  } 

  urlWithLocale(pageId, locale) {
    return this._reverseRouter.url(pageId, locale);
  }

}

extends ReverseRouterFacade;