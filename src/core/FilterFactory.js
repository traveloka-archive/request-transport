import LocaleParser from '../filters/LocaleParser';
import Sender from '../filters/Sender';

class FilterFactory {
  constructor(reverseRouter) {
    this._filters = {};
    this._filters[LocaleParser.name] = new LocaleParser(reverseRouter);
    this._filters[Sender.name] = new Sender();
  }
  
  getFilter(filterName) {
    if(this._filters.hasOwnProperty(filterName)) {
      return this._filters[filterName];
    }
    else {
      throw 'Filter ' + filterName + ' not found';
    }
  }
}

export default FilterFactory;