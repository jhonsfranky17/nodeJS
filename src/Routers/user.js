const express = require("express");
const userRoute = express.Router();
const userController = require("../Controllers/user.js");

userRoute.post("", userController.createUser);
userRoute.get("", userController.getAllUsers);
module.exports = userRoute;
