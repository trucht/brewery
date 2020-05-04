const {CartItem, Order} = require('../models/order');
const {errorHandler} = require('../helpers/dbErrorHandler');
const User = require('../models/user');

//Find order by id
exports.findById = async (req, res, next, id) => {
  Order.findById(id, function(err, order) {
    if (err || !order) {
      return res.json({error: errorHandler(err)});
    }
    return req.order = order;
  })
  next();
}

//Create order
exports.create = async (req, res) => {
  const newOrder = new Order(req.body);
  newOrder.save(function (err, order) {
    if (err || !order) {
      return res.json({error: errorHandler(err)});
    }
    return res.json(order);
  });
}

//Add order to user history
exports.addOrderToUserHistory = async (req, res, next) {

  const userHistory = [];

  req.body.order.products.forEach(item => {
    history.push({
      _id: item.id,
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
exports.list = Order.find({}, function (err, orderList) {
  if(err || !orderList) {
    return res.json({error: errorHandler(err)});
  }
  return res.json(orderList);
});

//Get order status value
exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues)
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




