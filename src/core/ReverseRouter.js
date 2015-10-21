import Immutable from 'immutable';

class ReverseRouter {
  constructor() {
    this._pages = Immutable.Map();
  }

  register(pageId, page) {
    if (this._pages.get(pageId) === undefined) {
      this._pages = this._pages.set(pageId, page);
    } else {
      throw new Error(`Duplicate pageId ${pageId}`);
    }
  }

  url(pageId, locale, params) {
    let page = this._pages.get(pageId);
    if (page === undefined) {
      throw new Error(`pageId: ${pageId} not found.`);
    }
    let host = page.getDomain(locale);
    let route = page.getRoute().replace(/(\/:(\w+)?(\(.+?\))?(\?)?)/g, (m, pFull, pName, pRegex, pOptional) => {
      let required = !pOptional;
      let param = pName;
      if (required && !params.hasOwnProperty(param)) {
        throw new Error(`Missing value for "${param}"`);
      }

      let value = params[param];
      if (pRegex && value) {
        if (!new RegExp(`^${pRegex}$`).test(value)) {
          throw new Error(`Invalid value for "${param}", should match "${pRegex}"`);
        }
      }
      return value ? `/${value}` : '';
    });
    return host + route;
  }
}

export default ReverseRouter;
