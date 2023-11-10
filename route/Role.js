const express = require("express");
const {
  getAllRole,
  createRole,
  deleteRole,
  getSingleRole,
  updateRole,
  updateRoleStatus,
} = require("../controllers/roleControllers.js");
const authVerify = require("../middlewares/authVerify.js");

//express route init
const RoleRoute = express.Router();

RoleRoute.use(authVerify);

RoleRoute.route("/").get(getAllRole).post(createRole);
RoleRoute.route("/:id").get(getSingleRole).delete(deleteRole).put(updateRole);

RoleRoute.route("/status/:id").post(updateRoleStatus);

//export routes
module.exports = RoleRoute;
