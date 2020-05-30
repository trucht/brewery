var express = require("express");
var router = express.Router();
// Middleware
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// Require the actual controller
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  listSearch,
  photo,
} = require("../controllers/product");

router.route("/products").get(list);

router.route("/products/:productId").get(read);

router
  .route("/products/:userId")
  .post(requireSignin, isAuth, isAdmin, create);

router
  .route("/products/:productId/:userId")
  .put(requireSignin, isAuth, isAdmin, update)
  .delete(requireSignin, isAuth, isAdmin, remove);

router.get("/products/search", listSearch);
router.get("/products/related/:productId", listRelated);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
