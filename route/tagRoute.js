const express = require("express");

const authVerify = require("../middlewares/authVerify.js");
const {
  createTag,
  deleteTag,
  getAllTag,
  getSingleTag,
  updateTag,
  updateTagStatus,
} = require("../controllers/tagController.js");

// create router

const router = express.Router();

//verify token
router.use(authVerify);

// routing

router.route("/").get(getAllTag).post(createTag);

router.route("/:id").get(getSingleTag).delete(deleteTag).patch(updateTag);

router.route("/status/:id").put(updateTagStatus);

// export router

module.exports = router;
