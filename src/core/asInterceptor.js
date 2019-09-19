/**
 * Given an express middleware, convert them into an interceptor,
 * which will only run just before request will be sent to client
 */
export default function asInterceptor(fn) {
  const interceptor = function (req, res, next) {
    const originalEnd = res.end;
    const originalWrite = res.write;

    res.end = function end (...args) {
      // This flag ensure original res.end to be called after
      // all fiters have been executed.
      if (res._filterHasBeenExecutedBefore) {
        return originalEnd.apply(res, args);
      }
      fn(req, res, () => {
        originalEnd.apply(res, args);
      });
      res._filterHasBeenExecutedBefore = true;
    };

    res.write = function write (...args) {
      // This flag ensure all onResponseFilters to be executed
      // before calling res.write.
      if (res._filterHasBeenExecutedBefore) {
        return originalEnd.apply(res, args);
      }
      fn(req, res, () => {
        originalWrite.apply(res, args);
      });
      res._filterHasBeenExecutedBefore = true;
    }

    next();
  };

  return interceptor;
}
