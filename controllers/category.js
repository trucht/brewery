const Category = require('../models/category');
const {errorHandler} = require('../helpers/dbErrorHandler');

//Get all categories
exports.list = async (req, res) => {
  Category.find({}, function(err, categoryList) {
    if(err) {
      return res.json({error: errorHandler(err)});
    }
    return res.json(categoryList);
  });
};

//Find category by id
exports.categoryById = async (req, res, next, categoryId) => {
  Category.findById(categoryId, function(err, category) {
    if(err || !category) {
      return res.json({error: "Category does not exist"});
    }
    req.category = category;
    next();
  })
};

//Get a single category
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
    return res.json({
      category: createdCategory
    });
  });
};

//Update category
exports.update = async (req, res) => {
  var category = req.category;
  category.name = req.body.name;
  category.save(function(err, updatedCategory) {
    if(err) {
      return res.json({error: errorHandler(err)});
    }
    return res.json({
      category: updatedCategory
    });
  });
};

//Delete category
exports.remove = async (req, res) => {
  const category = req.category;
  category.remove(function(err, data) {
    if(err) {
      return res.json({error: errorHandler(err)});
    }
    return res.json({message: "Category successfully deleted"});
  });
};























