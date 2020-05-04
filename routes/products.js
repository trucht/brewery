var express = require('express');
var router = express.Router();
var {list, findById, read, create, update, deleteById} = require('../controllers/product');

router.route('/products')
  .get(list)
  .post(create);

router.route('/products/:productId')
  .get(findById, read)
  .put(update)
  .delete(deleteById);

module.exports = router;
