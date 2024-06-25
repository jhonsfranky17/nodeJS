const express = require("express");
const server = express();
const userRoute = require("./src/Routers/user.js");
const bodyParser = require("body-parser");
const PORT = 8000;

server.use(bodyParser.json());
server.use("/users", userRoute);
server.listen(PORT, () => {
  console.log("Server started at " + PORT);
});
