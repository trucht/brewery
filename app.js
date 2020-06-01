var express = require("express");
var app = express();
var path = require("path");

//Middleware utilities
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const bodyParser = require('body-parser');

//Database
var mongoose = require("mongoose");

//Routes
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var categoriesRouter = require("./routes/categories");
var productsRouter = require("./routes/products");
var ordersRouter = require("./routes/orders");
var braintreeRouter = require("./routes/braintree");


//MongoDB Setup
mongoose.connect("mongodb://127.0.0.1:27017/brewerydb", {
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
app.use(cors());
app.use(logger("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes middleware
app.use("/", usersRouter);
app.use("/", authRouter);
app.use("/", categoriesRouter);
app.use("/", productsRouter);
app.use("/", ordersRouter);
app.use("/", braintreeRouter);


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
 });
 // error handler middleware
 app.use((error, req, res, next) => {
   res.status(error.status || 500).send({
    error: {
    status: error.status || 500,
    message: error.message || 'Internal Server Error',
   },
  });
 });
module.exports = app;
