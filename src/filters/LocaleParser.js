import Immutable from 'immutable';
import Filter from './Filter';

class LocaleParser extends Filter {
  constructor(reverseRouter) {
    super();
    this._reverseRouter = reverseRouter;
    this._countries = this._loadCountries();
    this._locales = this._generateLocales();
  } 
  
  _loadCountries() {
    let countries = Immutable.OrderedMap();
    countries = countries.set('id', { languages: ['id', 'en'] });
    countries = countries.set('sg', { languages: ['en'] });
    countries = countries.set('my', { languages: ['en', 'my'] });
    return countries;
  }
  
  _generateLocales() {
    let locales = Immutable.OrderedMap();
    this._countries.forEach((country, countryId) => {
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
  
  onFilter(req, res, next) {
    let urlParts = req.url.split('/');
    if(urlParts.length > 0) {
      let locale = this._locales.get(urlParts[1]);
      if(locale !== undefined) {
        req.locale = locale;
        req.url = req.url.substr(urlParts[1].length + 1);
        if(req.url.length === 0) {
          req.url = '/';
        }
      }
    }
    if(req.locale === undefined) {
      req.locale = this._locales.first();
    }
    req.router = this._reverseRouter;
    next();
  }
}

export default LocaleParser;