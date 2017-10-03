function errorHandler(err, req, res, next) {

  if(err.name === 'ValidationError') {
    err.status = 422;
    err.message = 'Unprocessable Entity';
    err.errors = err.toString();
  }

  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';

  res.status(err.status);
  res.json({ message: err.message, errors: err.errors });

  next(err);
}

module.exports = errorHandler;
