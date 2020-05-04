var Product = require('../models/product');
var errorhandler = require('../helpers/dbErrorHandler');

//Get all products
exports.list = async (req, res) => {
  Product.find({}, function(err, productList) {
    if(err) {
      return res.json({error: errorhandler(err)});
    }
    return res.json(productList);
  });
};

//Get product by Id
exports.findById = async (req, res, next) => {
  var productId = req.params.productId;
  Product.findById(productId, function(err, product) {
    if(err) {
      return res.json({error: errorhandler(err)});
    }
    req.product = product;
    next();
  });
};

exports.read = async (req, res) => {
  return res.json(req.product);
};

//Create new product
exports.create = async (req, res) => {
  var newProduct = new Product(req.body);
  await newProduct.save((err, createdProduct) => {
    if(err) {
      return res.json({error: errorhandler(err)});
    }
    return res.json(createdProduct);
  });
};

//Update product
exports.update = async (req, res) => {
  var product = req.body;
  var productId = req.params.productId;
  Product.findByIdAndUpdate(productId, product, {new: true}, function(err, updatedProduct) {
    if(err) {
      return res.json({error: errorhandler(err)});
    }
    return res.json(updatedProduct);
  });
};

//Delete product
exports.deleteById = async (req, res) => {
  var productId = req.params.productId;
  Product.findOneAndDelete(productId, function(err, product) {
    if(err) {
      return res.json({error: errorHandler(err)});
    }
    return res.json({message: "Delete product successful"});
  });
};

