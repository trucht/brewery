 var User = require('../models/user');
var errorHandler = require('../helpers/dbErrorHandler');


//List all users
exports.list = function (req, res) {
  User.find({}, function(err, usersList) {
    if(err) {
      return res.status(400).json({error: errorHandler(err)});
    }
    res.json(usersList);
  }).select('name email phone role updated created');
};


//Get user by userId
exports.userById = function(req, res, next) {
  const userId = req.params.userId;
  User.findById(userId, function(err, user){
    if(err || !user) {
      return res.status(401).json({error: "User not found"});
    }
    req.profile = user;
    next();
  });
};

exports.read = function(req, res) {
  //removing sensitive infomation
  req.profile.hashed_password = undefined;
  req.profile.salf = undefined;

  //then return the user object
  return res.json(req.profile);
};

//Update user
exports.update = function(req, res) {
  var user = req.body
  var userId = req.params.userId;
  User.findByIdAndUpdate(userId, user, {new: true}, function(err, updatedUser){
    if(err) {
      return res.status(400).json({error: errorHandler(err)});
    }
    updatedUser.hashed_password = undefined;
    updatedUser.salt = undefined;
    return res.json(updatedUser);
  });
};

//Delete user
exports.delete = function(req, res) {
  var userId = req.params.userId;
  User.findByIdAndDelete(userId, function(err, deletedUser) {
    if(err) {
      return res.status(400).json({error: errorHandler(err)});
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    return res.json({message: "Delete user successful"});
  });
};
