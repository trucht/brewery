const Product = require("../models/product");
const errorhandler = require("../helpers/dbErrorHandler");

const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

//Find product by Id
exports.findById = async (req, res, next, productId) => {
  Product.findById(productId, function (err, product) {
    if (err || !product) {
      return res.json({ error: "Product not found" });
    }
    req.product = product;
    next();
  });
};

//Get a single product
exports.read = async (req, res) => {
  return res.json(req.product);
};

//Create new product
exports.create = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.json({ error: "Image could not be uploaded" });
    }
  });

  //Cheking all fields
  const { name, description, abu, ibv, price, category, quantity } = fields;
  if (
    [name, description, abu, ibv, price, category, quantity].includes(undefined)
  ) {
    return res.json({ error: "All fields are required" });
  }

  const newProduct = new Product(fields);

  if (files.photo) {
    // Validate file size less than 5 MB
    if (files.photo.size > 2000000) {
      return res.json({ error: "File size should be less than 2mb" });
    }
    product.photo.data = fs.readFileSync(file.photo.path);
    product.photo.contentType = files.photo.type;
  }
  await newProduct.save((err, createdProduct) => {
    if (err) {
      return res.json({ error: errorhandler(err) });
    }
    return res.json({ product: createdProduct });
  });
};

//Update product
exports.update = async (req, res) => {
  
  var product = req.body;
  var productId = req.params.productId;
  Product.findByIdAndUpdate(productId, product, { new: true }, function (
    err,
    updatedProduct
  ) {
    if (err) {
      return res.json({ error: errorhandler(err) });
    }
    return res.json(updatedProduct);
  });
};

//Delete product
exports.deleteById = async (req, res) => {
  var productId = req.params.productId;
  Product.findOneAndDelete(productId, function (err, product) {
    if (err) {
      return res.json({ error: errorHandler(err) });
    }
    return res.json({ message: "Delete product successful" });
  });
};

//Get all products
exports.list = async (req, res) => {
  Product.find({}, function (err, productList) {
    if (err) {
      return res.json({ error: errorhandler(err) });
    }
    return res.json(productList);
  });
};
