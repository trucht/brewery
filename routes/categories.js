var express = require('express');
var router = express.Router();
var { list, findById, read, create, update, deleteById } = require('../controllers/category');

router.route('/categories')
  .get(list)
  .post(create)

router.route('/categories/:categoryId')
  .get(findById, read)
  .put(update)
  .delete(deleteById);

module.exports = router;
