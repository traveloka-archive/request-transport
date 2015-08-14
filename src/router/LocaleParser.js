import Immutable from 'immutable';

class LocaleParser {
  constructor() {
    this.countries = this.loadCountries();
    this.locales = this.generateLocales();
    this.pages = Immutable.OrderedMap();
    this.router = {
      url: function(routeId, locale) {
        return locale.routePrefix + this.pages.get(routeId).route;
      }.bind(this)
    };
  } 
  
  loadCountries() {
    let countries = Immutable.OrderedMap();
    countries = countries.set('id', { languages: ['id', 'en'] });
    countries = countries.set('sg', { languages: ['en'] });
    countries = countries.set('my', { languages: ['en', 'my'] });
    return countries;
  }
  
  generateLocales() {
    let locales = Immutable.OrderedMap();
    this.countries.forEach((country, countryId) => {
      country.languages.forEach(languageId => {
        let locale = {
          language: languageId,
          country: countryId
        };
        let fullLocale = languageId + '-' + countryId;
        
        // First locale is default
        if(locales.count() === 0) {
          locale.routePrefix = '';
          locales = locales.set(languageId, locale);
        }
        // First language stands alone (eg: 'id' stands for id-id)
        else if(locales.get(languageId) === undefined) {
          locale.routePrefix = '/' + languageId;
          locales = locales.set(languageId, locale);
        }
        else {
          locale.routePrefix = '/' + fullLocale;
        }
        
        // Always add full locale name
        if(locales.get(fullLocale) === undefined) {
          locales = locales.set(fullLocale, locale);
        }
      });
    });
    return locales;
  }
  
  parseLocale(req, res, next) {
    let urlParts = req.url.split('/');
    if(urlParts.length > 0) {
      let locale = this.locales.get(urlParts[1]);
      if(locale !== undefined) {
        req.locale = locale;
        req.url = req.url.substr(urlParts[1].length + 1);
        if(req.url.length === 0) {
          req.url = '/';
        }
      }
    }
    if(req.locale === undefined) {
      req.locale = this.locales.first();
    }
    req.router = this.router;
    next();
  }
  
  register(routeId, page) {
    if(this.pages.get(routeId) === undefined) {
      this.pages = this.pages.set(routeId, page);
    }
  }
}

export default LocaleParser;