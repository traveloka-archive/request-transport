import Sender from '../filters/Sender';

class FilterFactory {
  constructor(reverseRouter) {
    this._filters = {};
    this._filters[Sender.name] = new Sender();
  }
  
  getFilter(filterClass) {
    let filterName = filterClass.name;
    if(this._filters.hasOwnProperty(filterName)) {
      return this._filters[filterName];
    }
    else {
      throw 'Filter ' + filterName + ' not found';
    }
  }
}

export default FilterFactory;