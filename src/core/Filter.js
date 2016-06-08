class Filter {
  onRequest(req, res, next) {
    next();
  }

  onResponse(req, res, next) {
    next();
  }
}

export default Filter;
