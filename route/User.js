const express = require("express");
const {
  getAllUser,
  createUser,
  deleteUser,
  getSingleUser,
  updateUser,
  updateUserStatus,
} = require("../controllers/userControllers.js");
const authVerify = require("../middlewares/authVerify.js");

//express route init
const userRoute = express.Router();

userRoute.use(authVerify);

userRoute.route("/").get(getAllUser).post(createUser);
userRoute.route("/:id").get(getSingleUser).delete(deleteUser).put(updateUser);

userRoute.route("/status/:id").post(updateUserStatus);

//export routes
module.exports = userRoute;
