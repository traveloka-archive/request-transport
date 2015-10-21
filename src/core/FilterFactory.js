import Immutable from 'immutable';

class FilterFactory {
  constructor() {
    this._filters = Immutable.Map();
  }

  getFilter(FilterClass) {
    let filter = this._filters.get(FilterClass);
    if (filter === undefined) {
      filter = new FilterClass();
      this._filters = this._filters.set(FilterClass, filter);
    }
    return filter;
  }
}

export default FilterFactory;
