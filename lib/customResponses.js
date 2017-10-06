function customResponses(req, res, next) {
  res.notFound = function() {
    const err = new Error('Not Found');
    err.status = 404;
    throw err;
  };

  res.unauthorized = function() {
    const err = new Error('Login or Register to see more!');
    err.status = 401;
    throw err;
  };

  next();
}

module.exports = customResponses;
