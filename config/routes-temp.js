const router = require('express').Router();

const users = require('../controllers/users');
const auth = require('../controllers/auth');

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/users/:id')
  .get(users.show);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
