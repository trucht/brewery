const express = require('express');
const router = express.Router();

const {userById} = require('../controllers/user');
const {requireSignin, isAdmin, isAuth} = require('../controllers/auth');
const { list, categoryById, read, create, update, remove } = require('../controllers/category');

router.route('/categories/:categoryId')
  .get(read);

router.route('/categories')
  .get(list);

router.route('/categories/:userId')
  .post(requireSignin, isAuth, isAdmin, create);

router.route('/categories/:categoryId/:userId')
  .put(update, requireSignin, isAuth, isAdmin)
  .delete(remove, requireSignin, isAuth, isAdmin);

// Automatically run this function and populate in req when a parameter is found
router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
