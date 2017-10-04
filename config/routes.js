const router = require('express').Router();
const rides = require('../controllers/rides');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const darkSky = require('../controllers/weather');
const imageUpload = require('../lib/imageUpload');

router.route('/rides')
  .get(rides.index)
  .post(secureRoute, rides.create);

router.route('/rides/:id')
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
  .get(users.show)
  .put(secureRoute, imageUpload, users.update)
  .delete(users.delete);

router.route('/rides/:id/members')
  .post(secureRoute, rides.addMember); //make this a secure route?

router.route('/rides/:id/members/:memberId')
  .delete(rides.deleteMember); //resecure this






router.get('/weather', darkSky.proxy);

router.all('/*', (req, res) => res.status(400).send('NOT FOUND'));

module.exports = router;
