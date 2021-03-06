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
  .get(secureRoute, rides.show)
  .put(secureRoute, rides.update)
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
  .delete(secureRoute, users.delete);

router.route('/rides/:id/members')
  .post(secureRoute, rides.addMember); //make this a secure route?

router.route('/rides/:id/members/:memberId')
  .delete(secureRoute, rides.deleteMember); //resecure this

router.route('/rides/:id/comments')
  .post(secureRoute, rides.addComment);

router.route('/rides/:id/comments/:commentId')
  .delete(secureRoute, rides.deleteComment);

router.get('/weather', darkSky.proxy);

router.all('/*', (req, res) => res.status(400).send('NOT FOUND'));

module.exports = router;
