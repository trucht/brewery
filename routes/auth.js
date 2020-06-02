var express = require("express");
var router = express.Router();
var {
  signUp,
  signIn,
  signOut,
  sendPasswordResetEmail,
  receiveNewPassword,
  recover,
  reset,
  resetPassword
} = require("../controllers/auth");
var { userValidationRules, validate } = require("../validator");

router.route('/auth/signup').post(userValidationRules(), validate, signUp);

router.route('/auth/signin').post(signIn);

router.route('/auth/signout').get(signOut);

router.route('/auth/recover').post(recover);

router.route('/auth/reset/:token')
  .get(reset)
  .put(resetPassword);

module.exports = router;
