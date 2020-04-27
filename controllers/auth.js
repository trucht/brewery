var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

require('dotenv').config();

var User = require('../models/user');

var {errorHandler} = require('../helpers/dbErrorHandler');

var nodemailer = require('nodemailer');

//Sign up new user
exports.create = function(req, res) {

  const newUser = new User(req.body);

  await newUser.save((err, createdUser) => {

    if(err) {
      return (res.status(400).json({error: errorHandler(err)}));
    }

    createdUser.hashed_password = undefined;
    createdUser.salt = undefined;

    return res.json(createdUser);
  });
};

//Sign in existing user
