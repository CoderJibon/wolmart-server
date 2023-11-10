const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Role = require("../models/Role.js");
const createSlug = require("../utils/createSlug.js");
/**
 * @DESC get all Roles data
 * @ROUTE /api/v1/Role
 * @METHOD GET
 * @ACCESS public
 */

const getAllRole = asyncHandler(async (req, res) => {
  const Roles = await Role.find();

  // if (Roles.length === 0) {
  //   return res.status(404).json({ message: "Role data not found" });
  // }

  if (Roles.length > 0) {
    return res.status(200).json(Roles);
  }

  res.status(200).json([]);
});

/**
 * @DESC Get Single Roles data
 * @ROUTE /api/v1/Role/:id
 * @method GET
 * @access public
 */
const getSingleRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await Role.findById(id);

  if (!role) {
    return res.status(404).json({ message: "Role data not found" });
  }

  res.status(200).json(role);
});

/**
 * @DESC Create new Role
 * @ROUTE /api/v1/Role
 * @method POST
 * @access public
 */
const createRole = asyncHandler(async (req, res) => {
  const { name, permission } = req.body;

  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check Role
  const RoleCheck = await Role.findOne({ name });

  if (RoleCheck) {
    return res.status(400).json({ message: "Role already exists" });
  }

  // create new Role
  const role = await Role.create({
    name,
    slug: createSlug(name),
    permissions: permission,
  });

  res.status(200).json({ role, message: "Role created successfully" });
});

/**
 * @DESC Delete Role
 * @ROUTE /api/v1/Role/:id
 * @method DELETE
 * @access public
 */
const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await Role.findByIdAndDelete(id);

  res.status(200).json({ role, message: "Role Delete successfully" });
});

/**
 * @DESC Update Role
 * @ROUTE /api/v1/Role/:id
 * @method PUT/PATCH
 * @access public
 */
const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, permission } = req.body;
  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check Role
  const RoleCheck = await Role.findOne({ name });

  if (RoleCheck) {
    return res.status(400).json({ message: "Role already exists" });
  }

  // create new Role
  const role = await Role.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
      permissions: permission,
    },
    {
      new: true,
    }
  );

  res.status(200).json({ role, message: "Updated Role successfully" });
});

/**
 * @DESC Update role status
 * @ROUTE /api/v1/role/:id
 * @method PUT/PATCH
 * @access public
 */
const updateRoleStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;
  const role = await Role.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    { new: true }
  );

  res.status(200).json({ role, message: "Updated status successfully" });
});

//export Role controller
module.exports = {
  getAllRole,
  getSingleRole,
  createRole,
  deleteRole,
  updateRole,
  updateRoleStatus,
};
