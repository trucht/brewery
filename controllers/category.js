const Category = require('../models/category');
const {errorHandler} = require('../helpers/dbErrorHandler');

//Get all categories
exports.list = async (req, res) => {
  Category.find({}, function(err, categoryList) {
    if(err) {
      return res.status(400).json({error: errorHandler(err)});
    }
    return res.json(categoryList);
  });
};

//Get category by id
exports.findById = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  Category.findById(categoryId, function(err, category) {
    if(err) {
      return res.json({error: "Category does not exist"});
    }
    req.category = category;
    next();
  })
};

exports.read = async (req, res) =>{
  return res.json(req.category);
};

//Create new category
exports.create = async (req, res) => {
  const newCategory = new Category(req.body);

  await newCategory.save((err, createdCategory) => {
    if(err) {
      return res.json({error: errorHandler(err)});
    }
    return res.json(createdCategory);
  });
};

//Update category
exports.update = async (req, res) => {
  var category = req.body;
  var categoryId = req.params.categoryId;
  Category.findByIdAndUpdate(categoryId, category, {new: true}, function(err, updatedCategory) {
    if(err) {
      return res.json({error: errorHandler(err)});
    }
    return res.json(updatedCategory);
  });
};

//Delete category
exports.deleteById = async (req, res) => {
  var categoryId = req.params.categoryId;
  Category.findOneAndDelete(categoryId, function(err, category) {
    if(err) {
      return res.json({error: errorHandler(err)});
    }
    return res.json({message: "Delete category successful"});
  });
};























