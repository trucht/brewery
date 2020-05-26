const express = require("express");
const router = express.Router();
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const {
  list,
  userById,
  read,
  remove,
  update,
  purchasedHistory,
} = require("../controllers/user");

router.get(
  "/secret/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  async (req, res) => {
    res.json({ user: req.profile });
  }
);

router.route("/users").get(requireSignin, isAuth, isAdmin, list);

router
  .route("/users/:userId")
  .get(requireSignin, isAuth, read)
  .put(requireSignin, isAuth, update)
  .delete(requireSignin, isAuth, remove);

router
  .route("/users/:userId/orders")
  .get(requireSignin, isAuth, purchasedHistory);

router.param("userId", userById);

module.exports = router;
