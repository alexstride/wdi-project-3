function errorHandler(err, req, res, next) {

  if(err.name === 'ValidationError') {
    err.status = 422;
    err.message = 'Unprocessable Entity';

    const errors = {};

    for(const key in err.errors) {
      errors[key] = err.errors[key].message;
    }

    err.errors = errors;
  }

  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';

  res.status(err.status);
  res.json({ message: err.message, errors: err.errors });

  next(err);
}

module.exports = errorHandler;

// function errorHandler(err, req, res, next) {
//
//   if(err.name === 'ValidationError') {
//     err.status = 422;
//     err.message = 'Unprocessable Entity';
//
//     const errors = {};
//
//     for(const key in err.errors) {
//       errors[key] = err.errors[key].message;
//     }
//
//   }
//
//   err.message = err.message || 'Internal Server Error';
//   err.status = err.status || 500;
//
//   res.status(err.status);
//   res.json({ message: err.message, errors: err.errors });
//
//   next(err);
// }
//
// module.exports = errorHandler;
