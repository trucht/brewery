const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const nodemailer = require("nodemailer");

require("dotenv").config();

//nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  sercure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//Sign up new user
exports.signUp = async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save((err, createdUser) => {
    if (err) {
      return res.json({ error: errorHandler(err) });
    }

    createdUser.hashed_password = undefined;
    createdUser.salt = undefined;
    return res.json(createdUser);
  });

  const mailOptions = {
    from: "Beer Brewery",
    to: newUser.email,
    subject: "Welcome to our store",
    text:
      "Hi, there" +
      newUser.name +
      ", \n\nThis is Beer Brewery, thank you for joining us.",
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return res.json({ error: err });
    }
    console.log(info);
  });
};

//Reset password
exports.recover = function (req, res) {
  const email = req.body.email;
  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      return res.json({ error: "User not found" });
    }
    user.generatePasswordReset();
    user.save().then((user) => {
      const recoverURL = "http://"+ req.headers.host +"/auth/reset/" + user.resetPasswordToken;
      const mailOptions = {
        from: "Beer Brewery",
        to: user.email,
        subject: "Password change request",
        text: `Hi ${user.name} \nPlease click on the following link ${recoverURL} to reset your password. \n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log("exports.recover -> err", err)
          return res.json({ error: err });
        }
        console.log(info);
        return;
      });
    });
  });
};

exports.reset = function (req, res) {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    (err, user) => {
      if (err || !user) {
        return res.json({
          error: "Password reset token is invalid or has expired",
        });
      }
      return res.json(user);
    }
  );
};

exports.resetPassword = async (req, res) => {

  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    (err, user) => {
      if (err || !user) {
        return res.json({
          error: "Password reset token is invalid or has expired",
        });
      }
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      user.save((err) => {
        if (err) {
          res.json({ error: err });
        }
        const mailOptions = {
          to: user.email,
          from: "Beer Brewery",
          subject: "Your password has been changed",
          text: `Hi ${user.name} \nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if(err) {
            return res.json({ error: err });
          }
          res.status(200).json({message: 'Your password has been updated.'});
        });

      });
    }
  );
};
//Sign in existing user
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({ error: "User not found" });
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
