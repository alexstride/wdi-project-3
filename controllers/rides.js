const Ride = require('../models/ride');

function indexRide(req, res, next) {
  console.log('Inside API index!');
  Ride
    .find()
    .exec()
    .then((rides) => res.json(rides))
    .catch(next);
}

function createRide(req, res, next) {
  Ride
    .create(req.body)
    .then((ride) => res.status(201).json(ride))
    .catch(next);
}

function showRide(req, res, next) {
  console.log('Inside API show!');
  console.log('Params sent to server: ', req.params);
  Ride
    .findById(req.params.id)
    .exec()
    .then((ride) => {
      if(!ride) return res.notFound();
      console.log('show');
      res.json(ride);
    })
    .catch(next);
}

function updateRide(req, res, next) {
  Ride
    .findById(req.params.id)
    .exec()
    .then((ride) => {
      if(!ride) return res.notFound();
      Object.assign(ride, req.body);
      return ride.save();
    })
    .then((ride) => res.json(ride))
    .catch(next);
}

function deleteRide(req, res, next) {
  Ride
    .findById(req.params.id)
    .exec()
    .then((ride) => {
      if(!ride) return res.notFound();
      return ride.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRide,
  create: createRide,
  show: showRide,
  update: updateRide,
  delete: deleteRide
};
