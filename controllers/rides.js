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

  req.body.createdBy = req.currentUser;

  Ride
    .findById(req.params.id)
    .exec()
    .then(ride => {
      if(!ride) return res.notFound();
      // push the logged in users id to the members array
      const member = ride.members.create(req.body);
      ride.members.push(member);

      return ride.save()
        .then(() => res.json(member));
    })
    .catch(next);
}

function deleteMemberRoute(req, res, next) {
  Ride
    .findById(req.params.id)
    .exec()
    .then((ride) => {
      if(!ride) return res.notFound();

      const member = ride.members.id(req.params.memberId);
      member.remove();

      return ride.save();
    })
    .then(() => res.status(204).end())
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
