const Ride = require('../models/ride');

function indexRoute(req, res, next) {
  Ride
    .find()
    .exec()
    .then((rides) => res.json(rides))
    .catch(next);
}

function createRoute(req, res, next) {
  Ride
    .create(req.body)
    .then((ride) => res.status(201).json(ride))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute
};
