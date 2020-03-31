var User = require('../models/user');
var errorHandler = require('../helpers/dbErrorHandler');

//Create new user
exports.create = function(req, res) {
  const newUser = new User(req.body);
  newUser.save(function(err, createdUser){
    if(err) {
      return (res.status(400).json({error: errorHandler(err)}));
    }
    res.status(200).json({message: "Successfully signed up!"});
  });
};

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
exports.update = function(req, res, next) {
  var user = req.profile;
  user = _.extend(user, req.body);
  User.findByIdAndUpdate(user._id, user, function(err, updatedUser){
    if(err) {
      return res.status(400).json({error: errorHandler.getErrorMessage(err)});
    }
    updatedUser.hashed_password = undefined;
    updatedUser.salt = undefined;
    res.json(updatedUser);
  });
};

//Delete user
exports.delete = function(req, res, next) {
  let user = req.params.userId;
  User.findOneAndDelete(user._id, function(err, deletedUser) {
    if(err) {
      return res.status(400).json({error: errorHandler.getErrorMessage(err)});
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  });
};
