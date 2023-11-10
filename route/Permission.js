const express = require("express");
const {
  getAllPermission,
  createPermission,
  deletePermission,
  getSinglePermission,
  updatePermission,
  updatePermissionStatus,
} = require("../controllers/permissionControllers.js");
const authVerify = require("../middlewares/authVerify.js");

//express route init
const PermissionRoute = express.Router();

PermissionRoute.use(authVerify);

PermissionRoute.route("/").get(getAllPermission).post(createPermission);
PermissionRoute.route("/:id")
  .get(getSinglePermission)
  .delete(deletePermission)
  .put(updatePermission);

PermissionRoute.route("/status/:id").post(updatePermissionStatus);

//export routes
module.exports = PermissionRoute;
