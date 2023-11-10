const express = require("express");
const {
  logout,
  register,
  login,
  loggedInUser,
  verifyEmail,
  forget,
  forgetPassword,
} = require("../controllers/authControllers.js");
const authVerify = require("../middlewares/authVerify.js");
//express route init
const authRoute = express.Router();

// create route
authRoute.route("/login").post(login);
authRoute.route("/login/:token").get(verifyEmail);
authRoute.route("/logout").post(logout);
authRoute.route("/register").post(register);
authRoute.route("/forget").post(forget);
//authRoute.route("/forget/:token").post(forgetPassword);

authRoute.get("/me", authVerify, loggedInUser);

//export routes
module.exports = authRoute;
