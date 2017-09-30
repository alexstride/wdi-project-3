const User = require('../models/user');

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .populate('posts')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      return res.json(user);
    })
    .catch(next);
}

module.exports = {
  show: usersShow
};
