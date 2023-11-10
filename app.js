const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const errorHandler = require("./middlewares/errorHandler.js");
const notFound = require("./middlewares/notFound.js");
const userRoute = require("./route/User.js");
const authRoute = require("./route/auth.js");
const cookieParser = require("cookie-parser");
const PermissionRoute = require("./route/Permission.js");
const RoleRoute = require("./route/Role.js");
const tagRoute = require("./route/tagRoute.js");
const categoryRoute = require("./route/categoryRoute.js");
const brandRoute = require("./route/brandRoute.js");
const productRoute = require("./route/productRoute.js");

// express initialization
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

// static folder
app.use(express.static(path.join(__dirname + "public")));

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/permission", PermissionRoute);
app.use("/api/v1/role", RoleRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tag", tagRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/product", productRoute);

//error handler
app.use(errorHandler);

//404 Not Found
app.use(notFound);

//export app
module.exports = app;
