var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

/* GET users listing. */
router.route('/api/users')
  .get(userController.list)

router.route('api/users/:userId')
  .put(userController.update);

module.exports = router;
