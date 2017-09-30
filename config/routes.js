const router = require('express').Router();
const rides = require('../controllers/rides');






router.route('rides/:id')
  .get(rides.show)
  .put(rides.update)
  .delete(rides.delete);


module.exports = router;
