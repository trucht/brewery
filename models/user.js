var mongoose = require("mongoose");
var crypto = require("crypto");

var UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      uniqued: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      uniqued: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    history: {
      type: Array,
      default: [],
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },

    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

UserSchema.method("authenticate", function (plainText) {
  return this.encryptPassword(plainText) === this.hashed_password;
});

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },

  generatePasswordReset: function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
  }
};

module.exports = mongoose.model("User", UserSchema);
