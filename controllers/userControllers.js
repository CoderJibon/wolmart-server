const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const createSlug = require("../utils/createSlug.js");
const { newUserAccessSendMail } = require("../utils/sendMail.js");

/**
 * @DESC get all users data
 * @ROUTE /api/v1/user
 * @METHOD GET
 * @ACCESS public
 */

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().populate("role");

  if (users.length > 0) {
    return res.status(200).json(users);
  }

  res.status(200).json([]);
});

/**
 * @DESC Get Single users data
 * @ROUTE /api/v1/user/:id
 * @method GET
 * @access public
 */
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User data not found" });
  }

  res.status(200).json(user);
});

/**
 * @DESC Create new User
 * @ROUTE /api/v1/user
 * @method POST
 * @access public
 */
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check user email
  const userEmailCheck = await User.findOne({ email });

  if (userEmailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // password hash
  const hashPass = await bcrypt.hash(password, 10);

  //send mail
  newUserAccessSendMail({
    to: email,
    msg: `Hello, MR. ${name}. i hope you got the wolmart login access is: Email : ${email}  | Password : ${password}`,
  });

  // create new user
  const user = await User.create({
    name,
    email,
    slug: createSlug(name),
    password: hashPass,
    role,
  });

  //confirm user created
  const successUser = await User.findById(user.id).populate("role");

  //new response
  res
    .status(200)
    .json({ user: successUser, message: `${name} created successfully` });
});

/**
 * @DESC Delete User
 * @ROUTE /api/v1/user/:id
 * @method DELETE
 * @access public
 */
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  res.status(200).json({ user, message: "User deleted successfully" });
});

/**
 * @DESC Update User
 * @ROUTE /api/v1/user/:id
 * @method PUT/PATCH
 * @access public
 */
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, email, mobile, password, gender } = req.body;

  if (!name || !email || !mobile || !password || !gender) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      mobile,
      password,
      gender,
    },
    { new: true }
  );

  res.status(200).json({ user, message: `Updated ${name} successfully` });
});

/**
 * @DESC Update User status
 * @ROUTE /api/v1/User/:id
 * @method PUT/PATCH
 * @access public
 */
const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    { new: true }
  );

  res.status(200).json({ user, message: "Updated status successfully" });
});

//export user controller
module.exports = {
  getAllUser,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  updateUserStatus,
};
