const mongoose = require("mongoose");
const { MONGODB_URL } = require("../utils/secret.js");

// mongoose Connection
const mongoDBConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("database connection established".bgBlue);
  } catch (error) {
    console.log("database connection failed ".bgRed);
  }
};

//export mongoose Connection
module.exports = mongoDBConnect;
