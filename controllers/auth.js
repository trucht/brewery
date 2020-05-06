const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const nodemailer = require("nodemailer");

require("dotenv").config();

//Using nodemailer to send email
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  sercure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});


//Sign up new user
exports.signUp = async (req, res) => {
  const newUser = new User(req.body);

  await newUser.save((err, createdUser) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }

    createdUser.hashed_password = undefined;
    createdUser.salt = undefined;

    return res.json(createdUser);
  });

  const message = {
    from: 'Admin' + '<' + process.env.EMAIL + '>',
    to: newUser.email,
    subject: "Welcome to our store",
    text: "Hi, there" + newUser.name + ", \n\nThank you for joining us."
  };

  transporter.sendMail(message, function(err, info) {
    if(err) {
      return res.json({error: err});
    }
    console.log("The message was sent");
  });
};

//Sign in existing user
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: req.body.email });
  if(!user) {
    return res.json({error: "user not found"});
  }

  if (user.authenticate(password)) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  }
  return res.json({ error: "Invalid credentials" });
};

//Sign out user
exports.signOut = async (req, res) => {
  res.clearCookie("t");
  res.json({ message: "You have successfully logged out" });
};

// Use as middleware to protect routes
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

// Middleware for currently logged in user
exports.isAuth = async (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!user) {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
};

// Middleware for Admin
exports.isAdmin = async (req, res, next) => {
  // Not Admin
  if (req.profile.role === 0) {
    return res.status(403).json({ error: "Admin access required" });
  }

  next();
};
