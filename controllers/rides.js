const Ride = require('../models/ride');

function indexRide(req, res, next) {
  Ride
    .find()
    .populate('createdBy member')
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
  console.log(req.params.id);

  Ride
    .findById(req.params.id)
    .populate('createdBy') //add members
    .exec()
    .then((ride) => {
      if(!ride) return res.notFound();
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
      delete req.body.createdBy;
      Object.assign(ride, req.body);
      console.log(ride);
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

function addMemberRoute(req, res, next) {

  Ride
    .findById(req.params.id)
    .exec()
    .then(ride => {
      if(!ride) return res.notFound();
      console.log('content of req.body', req.body);
      // push the logged in users id to the members array
      ride.members.push(req.currentUser.id);

      return ride.save();
    })
    .then(ride => res.json(ride))
    .catch(next);
}

function deleteMemberRoute(req, res, next) {
  Ride
    .findById(req.params.id)
    .exec()
    .then((ride) => {
      if(!ride) return res.notFound();

      console.log(`trying to delete ${req.params.memberId} from ${ride.name}`);
      ride.members.splice(ride.members.indexOf(req.params.memberId), 1); ////left off here!

      return ride.save();
    })
    .then(ride => {
      console.log('ride after deleting: ', ride);
      res.status(204).end();
    })
    .catch(next);
}

module.exports = {
  index: indexRide,
  create: createRide,
  show: showRide,
  update: updateRide,
  delete: deleteRide,
  addMember: addMemberRoute,
  deleteMember: deleteMemberRoute
};
