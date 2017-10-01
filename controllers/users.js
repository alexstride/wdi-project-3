const User = require('../models/user');

function usersCreate(req, res, next) {
  User
    .create(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next);
}

function usersShow(req, res, next) {
  console.log('inside userShow');
  console.log('Params sent to server: ', req.params);
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      console.log('show');
      res.json(user);
    })
    .catch(next);
}

function usersUpdate(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      Object.assign(user, req.body);
      return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
}

function usersDelete(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  create: usersCreate,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
