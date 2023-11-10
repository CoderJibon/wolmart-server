const { SERVER_PORT } = require("./utils/secret.js");
const app = require("./app.js");
const mongoDBConnect = require("./config/DB.js");

//server
app.listen(SERVER_PORT, async () => {
  await mongoDBConnect();
  console.log(`listening on port : ${SERVER_PORT}`.bgCyan);
});
