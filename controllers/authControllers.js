const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES,
  APP_ENV,
  ADMIN_PATH,
  EMAIL_TOKEN,
} = require("../utils/secret.js");
const { validateEmail } = require("../utils/sendMail.js");

/**
 * @DESC user login
 * @ROUTE /api/v1/auth/login
 * @METHOD post
 * @ACCESS public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email: email }).populate("role");
  if (!user) {
    return res.status(404).json({ message: "invalid Email Address" });
  }

  const passwordCheck = bcrypt.compareSync(password, user?.password);
  if (!passwordCheck) {
    return res.status(404).json({ message: "Wrong password" });
  }

  const accessToken = jwt.sign({ email: user?.email }, ACCESS_TOKEN, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    accessToken,
    user: user,
    message: "User Login Successful",
  });
});

/**
 * @DESC User Login out
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
});

/**
 * @DESC register new User
 * @ROUTE /api/v1/user
 * @method POST
 * @access public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

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

  // create new user
  const user = await User.create({
    name,
    email,
    password: hashPass,
  });

  const activeToken = jwt.sign({ email: user?.email }, EMAIL_TOKEN, {
    expiresIn: 1000 * 60 * 60 * 10,
  });

  const tokenGenerator = `http://localhost:3000/login/${activeToken}`;

  validateEmail({ to: user.email, name: user.name, token: tokenGenerator });

  res.status(200).json({
    user,
    message: "Please Verify Your Email",
  });
});
/**
 * @DESC Token verification
 * @ROUTE /api/v1/Login/:token
 * @method POST
 * @access public
 */

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const activeToken = jwt.verify(token, EMAIL_TOKEN);

  if (!activeToken) {
    return res.status(400).json({ message: "Invalid Active link" });
  }

  const activeUser = await User.findOne({ email: activeToken.email });

  if (activeUser.verify) {
    return res.status(400).json({ message: "your account already active. 😊" });
  } else {
    await User.findByIdAndUpdate(activeUser[0]._id, {
      verify: true,
    });
    return res
      .status(200)
      .json({ message: "Account Activision successful. 😊" });
  }
});

/**
 * @DESC Create new User
 * @ROUTE /api/v1/user
 * @method POST
 * @access public
 */
const loggedInUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.me);
});

/**
 * @DESC Forget Password
 * @method post
 * @access public
 */

const forget = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const activeUser = await User.findOne({ email });
  console.log(activeUser);
  if (!activeUser) {
    return res.status(400).json({ message: "Invalid Email Address" });
  }

  const activeToken = jwt.sign({ email: activeUser?.email }, EMAIL_TOKEN, {
    expiresIn: 1000 * 60 * 60 * 10,
  });

  const tokenGenerator = `http://localhost:3000/forget/${activeToken}`;

  validateEmail({
    to: activeUser.email,
    name: activeUser.name,
    token: tokenGenerator,
  });

  return res.status(200).json({ message: "Forget Password Mail Send 😊" });
});

/**
 * @DESC Forget Password
 * @ROUTE /api/v1/forget/:token
 * @method POST
 * @access public
 */

const forgetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const activeToken = jwt.verify(token, EMAIL_TOKEN);

  if (!activeToken) {
    return res.status(400).json({ message: "Token Invalid" });
  }

  const activeUser = await User.findOne({ email: activeToken.email });

  if (activeUser.verify) {
    if (!password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // password hash
    const hashPass = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(activeUser[0]._id, {
      password: hashPass,
    });
    return res.status(200).json({ message: "PassWord Change successful. 😊" });
  }
});

module.exports = {
  forgetPassword,
  forget,
  login,
  logout,
  register,
  loggedInUser,
  verifyEmail,
};
