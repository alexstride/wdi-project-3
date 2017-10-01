const router = require('express').Router();
const rides = require('../controllers/rides');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/rides')
  .get(rides.index)
  .post(secureRoute, rides.create);

router.route('rides/:id')
  .all(secureRoute)
  .get(rides.show)
  .put(rides.update)
  .delete(rides.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/users')
  .post(secureRoute, users.create);

router.route('/users/:id')
  .all(secureRoute)
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.all('/*', (req, res) => res.status(400).send('NOT FOUND'));

module.exports = router;
