const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizPermission,
} = require("../middleware/authentication");

const {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");

const { getSingleProductReview } = require("../controllers/reviewController");

router
  .route("/")
  .post([authenticateUser, authorizPermission("admin")], createProduct)
  .get(getAllProduct);

router
  .route("/uploadImage")
  .post([authenticateUser, authorizPermission("admin")], uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticateUser, authorizPermission("admin")], updateProduct)
  .delete([authenticateUser, authorizPermission("admin")], deleteProduct);

router.route("/:id/reviews").get(getSingleProductReview);

module.exports = router;
