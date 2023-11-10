const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Permission = require("../models/Permission.js");
const createSlug = require("../utils/createSlug.js");
/**
 * @DESC get all Permissions data
 * @ROUTE /api/v1/Permission
 * @METHOD GET
 * @ACCESS public
 */

const getAllPermission = asyncHandler(async (req, res) => {
  const permissions = await Permission.find();

  // if (permissions.length === 0) {
  //   return res.status(404).json({ message: "Permission data not found" });
  // }

  if (permissions.length > 0) {
    return res.status(200).json(permissions);
  }
  res.status(200).json([]);
});

/**
 * @DESC Get Single Permissions data
 * @ROUTE /api/v1/Permission/:id
 * @method GET
 * @access public
 */
const getSinglePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const permissions = await Permission.findById(id);

  if (!permissions) {
    return res.status(404).json({ message: "Permission data not found" });
  }

  res.status(200).json(permissions);
});

/**
 * @DESC Create new Permission
 * @ROUTE /api/v1/Permission
 * @method POST
 * @access public
 */
const createPermission = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check permission
  const permissionCheck = await Permission.findOne({ name });

  if (permissionCheck) {
    return res.status(400).json({ message: "permission already exists" });
  }

  // create new Permission
  const permission = await Permission.create({
    name,
    slug: createSlug(name),
  });

  res
    .status(200)
    .json({ permission, message: "Permission created successfully" });
});

/**
 * @DESC Delete Permission
 * @ROUTE /api/v1/Permission/:id
 * @method DELETE
 * @access public
 */
const deletePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const permission = await Permission.findByIdAndDelete(id);

  res
    .status(200)
    .json({ permission, message: "permission Delete successfully" });
});

/**
 * @DESC Update Permission
 * @ROUTE /api/v1/Permission/:id
 * @method PUT/PATCH
 * @access public
 */
const updatePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const permission = await Permission.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
    },
    { new: true }
  );

  res
    .status(200)
    .json({ permission, message: "Updated permissions successfully" });
});

/**
 * @DESC Update Permission status
 * @ROUTE /api/v1/Permission/:id
 * @method PUT/PATCH
 * @access public
 */
const updatePermissionStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const permission = await Permission.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    { new: true }
  );

  res.status(200).json({ permission, message: "Updated status successfully" });
});

//export Permission controller
module.exports = {
  getAllPermission,
  getSinglePermission,
  createPermission,
  deletePermission,
  updatePermission,
  updatePermissionStatus,
};
