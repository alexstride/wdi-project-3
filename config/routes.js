const router = require('express').Router();
const rides = require('../controllers/rides');


router.route('/rides')
  .get(rides.index)
  .post(rides.create);































module.exports = router;
