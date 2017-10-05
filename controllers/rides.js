const Ride = require('../models/ride');

function indexRide(req, res, next) {
  Ride
    .find()
    .populate('createdBy members')
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
    .populate('createdBy members') //add members
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

      return ride.save()
        // send the current user object back as the response to push into the Angular array
        .then(() => res.json(req.currentUser));
    })
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

function addCommentRoute(req, res, next) {

  req.body.createdBy = req.currentUser;

  Ride
    .findById(req.params.id)
    .exec()
    .then((ride) => {
      if(!ride) return res.notFound();

      const comment = ride.comments.create(req.body);
      ride.comments.push(comment);

      return ride.save()
        .then(() => res.json(comment));
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Ride
    .findById(req.params.id)
    .exec()
    .then((ride) => {
      if(!ride) return res.notFound();

      const comment = ride.comments.id(req.params.commentId);
      comment.remove();

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
  deleteMember: deleteMemberRoute,
  addComment: addCommentRoute,
  deleteComment: deleteCommentRoute
};
