/**
 * Given an express middleware, convert them into an interceptor,
 * which will only run just before request will be sent to client
 */
export default function asInterceptor(fn) {
  const interceptor = function (req, res, next) {
    const originalEnd = res.end;

    res.end = function end (chunk, encoding) {
      const args = Array.prototype.slice.call(arguments);
      fn(req, res, () => {
        originalEnd.apply(res, args);
      });
    };

    next();
  };

  return interceptor;
}
