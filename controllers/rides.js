const Ride = require('../models/ride');





















function showRide(req, res, next) {
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
  show: showRide,
  update: updateRide,
  delete: deleteRide
};
