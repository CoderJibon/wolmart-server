const express = require("express");

const authVerify = require("../middlewares/authVerify.js");
const {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  updateProductStatus,
} = require("../controllers/productController.js");
const { productPhoto } = require("../utils/multer.js");

// create router
const router = express.Router();

//verify token
router.use(authVerify);

// routing
router.route("/").get(getAllProduct).post(productPhoto, createProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .patch(updateProduct);

router.route("/status/:id").put(updateProductStatus);
router.route("/:id").put(updateProduct);

// export router

module.exports = router;
