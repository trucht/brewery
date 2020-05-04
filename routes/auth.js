var express = require('express');
var router = express.Router();
var {signUp, signIn, signOut} = require('../controllers/auth');
var {userValidationRules, validate} = require('../validator');

router.route('/auth/signup')
  .post(userValidationRules(), validate, signUp);

router.route('/auth/signin')
  .post(signIn);

router.route('/auth/signout')
  .get(signOut);

module.exports = router;

