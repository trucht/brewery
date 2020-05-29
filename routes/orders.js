const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { decreaseQuantity } = require("../controllers/product");
const {
  create,
  addOrderToUserHistory,
  list,
  getStatusValues,
  UpdateOrderStatus,
  orderById,
} = require("../controllers/order");

router
  .route("/orders/:userId")
  .get(requireSignin, isAuth, isAdmin, list)
  .post(
    requireSignin,
    isAuth,
    isAdmin,
    addOrderToUserHistory,
    decreaseQuantity,
    create
  );

router.get(
  "orders/status-value/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
);

router.put(
  "orders/:orderId/status/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  UpdateOrderStatus
);

module.exports = router;
