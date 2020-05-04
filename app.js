var express = require("express");
var app = express();
var path = require("path");

//Middleware utilities
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//Database
var mongoose = require("mongoose");

//Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var categoriesRouter = require("./routes/categories")

//MongoDB Setup
mongoose.connect("mongodb://localhost:27017/brewery", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Database Connected...");
});

//Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes middleware
app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", authRouter);
app.use("/", categoriesRouter);


module.exports = app;
