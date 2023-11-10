const express = require("express");

const authVerify = require("../middlewares/authVerify.js");
const {
  createBrand,
  deleteBrand,
  getAllBrand,
  getSingleBrand,
  updateBrand,
  updateBrandStatus,
} = require("../controllers/brandController.js");
const { brandPhoto } = require("../utils/multer.js");

// create router
const router = express.Router();

//verify token
router.use(authVerify);

// routing
router.route("/").get(getAllBrand).post(brandPhoto(), createBrand);

router.route("/:id").get(getSingleBrand).delete(deleteBrand).patch(updateBrand);

router.route("/status/:id").put(updateBrandStatus);
router.route("/:id").put(brandPhoto(), updateBrand);

// export router

module.exports = router;
