const {CartItem, Order} = require('../models/order');
const {errorHandler} = require('../helpers/dbErrorHandler');
const User = require('../models/user');

// nodemailer to send emails
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
service : 'gmail',
secure : false,
auth : {
    user : process.env.EMAILID,
    pass : process.env.EMAILPASSWORD
},
tls : {
    rejectUnauthorized : false
}});


//Find order by id
exports.orderById = async (req, res, next, id) => {
  Order.findById(id, 'products.product', 'name price', function(err, order) {
    if (err || !order) {
      return res.json({error: errorHandler(err)});
    }
    req.order = order;
  })
  next();
}

//Create order
exports.create = async (req, res) => {
  req.body.order.user = req.profile;
  const newOrder = new Order(req.body.order);
  newOrder.save(function (err, order) {
    if (err) {
      return res.json({error: errorHandler(err)});
    }
    return res.json(order);
  });

  //send email to admin
  let messageToAdmin = {
    from : "Beer Brewery",
    to : process.env.ADMIN_EMAIL,
    subject : "Hey admin, a purchase has been made!",
    text : "Hello, \n\nA purchase of " + req.body.order.amount + " has been made by " + req.profile.name + "\n\nRegards, \nBeer Brewery"
  };

  transporter.sendMail(messageToAdmin,(err,info) => {
    if(err) throw err;
    console.log("The message was sent");
  });

  //send email to user
  let messageToUser = {
    from : "Beer Brewery",
    to : req.profile.email,
    subject : "Your order Beer Brewery was successful",
    text : "Hello " + req.profile.name + ", \n\nYou have successfully made purchase of " + req.body.order.amount + "on Beer Brewery. Please check your dashboard to track the status of your order.\n\nRegards, \nBeer Brewery"
  };

  transporter.sendMail(messageToUser,(err,info) => {
    if(err) throw err;
    console.log("The message was sent");
  });
}

//Add order to user history
exports.addOrderToUserHistory = async (req, res, next) {

  const userHistory = [];

  req.body.order.products.forEach(item => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount
    });
  });

  User.findOneAndUpdate(_id: req.profile._id, {$push: {history: userHistory}}, {new: true}, function (err, user) {
    if(err || !user) {
      return res.json({error: errorHandler(err)});
    }
    next();
  });
}

//Get all orders
exports.list = Order.find({}, 'user', '_id name address phone', {sort: {created: 1}},function (err, orderList) {
  if(err || !orderList) {
    return res.json({error: errorHandler(err)});
  }
  return res.json(orderList);
});

//Get order status value
exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
}

//Update order status
exports.UpdateOrderStatus = (req, res) => {
  Order.update({_id: req.body.orderId}, {$set: {status: req.body.status}}, (err, order) => {
      if(err)
      {
          return res.json({ error: errorHandler(err)});
      }
      return res.json(order);
  });
}




