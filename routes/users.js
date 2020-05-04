var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
const {userValidationRules, validate} = require('../validator');

router.route('/users')
  .get(userController.list);

router.route('/users/:userId')
  .get(userController.userById, userController.read)
  .put(userValidationRules(), validate, userController.update)
  .delete(userController.delete);

module.exports = router;

