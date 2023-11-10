const dotenv = require("dotenv").config();

const ADMIN_PATH = process.env.ADMIN_PATH;
const EMAIL_TOKEN = process.env.EMAIL_TOKEN;

// secret door
const SERVER_PORT = process.env.WOLMART_SERVER_PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES;
const APP_ENV = process.env.APP_ENV;

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// export the secret file
module.exports = {
  EMAIL_TOKEN,
  ADMIN_PATH,
  SERVER_PORT,
  MONGODB_URL,
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES,
  APP_ENV,
  EMAIL_USER,
  EMAIL_PASS,
};
