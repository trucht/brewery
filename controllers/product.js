const Product = require("../models/product");
const errorhandler = require("../helpers/dbErrorHandler");

const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

//Find product by Id
exports.productById = async (req, res, next, productId) => {
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

    //Cheking all fields
    const {
      name,
      description,
      abu,
      ibv,
      price,
      category,
      shipping,
      quantity,
    } = fields;

    if (
      [
        name,
        description,
        abu,
        ibv,
        price,
        category,
        shipping,
        quantity,
      ].includes(undefined)
    ) {
      return res.json({ error: "All fields are required" });
    }

    const newProduct = new Product(fields);

    if (files.photo) {
      // Validate file size less than 2 MB
      if (files.photo.size > 2000000) {
        return res.json({ error: "File size should be less than 2mb" });
      }
      newProduct.photo.data = fs.readFileSync(files.photo.path);
      newProduct.photo.contentType = files.photo.type;
    }

    newProduct.save((err, createdProduct) => {
      if (err) {
        return res.json({ error: errorhandler(err) });
      }
      return res.json({ product: createdProduct });
    });
  });
};

//Update product
exports.update = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.json({ error: "Image could not be uploaded" });
    }

    let product = req.product;
    product = _.extend(product, fields);

    if (files.photo) {
      // Validate file size less than 5 MB
      if (files.photo.size > 2000000) {
        return res.json({ error: "File size should be less than 2mb" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, data) => {
      if (err) {
        return res.json({ error: errorHandler(err) });
      }
      res.json({
        product: data,
      });
    });
  });
};

//Delete product
exports.remove = async (req, res) => {
  var product = req.product;
  Product.findOneAndDelete(productId, function (err, product) {
    if (err) {
      return res.json({ error: errorHandler(err) });
    }
    return res.json({ message: "Delete product successfully" });
  });
};

//Get all products
// Get all products
exports.list = async (req, res) => {
  // query parameter
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  await Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          msg: "Products not found",
        });
      }

      return res.json(data);
    });
};

// Get related products (same category)
exports.listRelated = async (req, res) => {
  // query parameter
  console.log(req.query.limit);
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  // find all products of same category except same category
  await Product.find({
    _id: { $ne: req.product },
    category: req.product.category,
  })
    .populate("category", "_id name") // populate only id and name
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          msg: "Products not found",
        });
      }

      return res.json(data);
    });
};

//list product by search
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

// Return product photo
exports.photo = async (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }

  next();
};

// Return products by query params
exports.listSearch = async (req, res) => {
  // create query object to hold search value and category value
  const query = {};

  // Assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" }; //  i is for case insenstivity
    // Assign category value to query.category
    if (req.query.category && req.query.category !== "All") {
      query.category = req.query.category;
    }

    await Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }

      res.json(products);
    }).select("-photo");
  }
};

// Decrease products quantity when item is sold
exports.decreaseQuantity = async (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  Product.bulkWrite(bulkOps, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Could not update product",
      });
    }

    next();
  });
};
