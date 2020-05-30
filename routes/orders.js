const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { decreaseQuantity } = require("../controllers/product");
const {
  create,
  addOrderToUserHistory,
  list,
  statusValues,
  UpdateOrderStatus,
  orderById,
} = require("../controllers/order");

router
  .route("/orders/:userId")
  .get(requireSignin, isAuth, isAdmin, list)
  .post(
    requireSignin,
    isAuth,
    addOrderToUserHistory,
    decreaseQuantity,
    create
  );

router
  .route("orders/status-values/:userId")
  .get(requireSignin, isAuth, isAdmin, statusValues);

router.put(
  "orders/:orderId/status/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  UpdateOrderStatus
);

router.param("userId", userById);
router.param('orderId', orderById)

module.exports = router;
