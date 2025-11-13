const { registerUser, login, getUsers } = require("./user.controller.js");
const express = require("express");

const Router = express.Router();

Router.post("/register", registerUser);
Router.post("/login", login);
Router.get("/users", getUsers);

module.exports = Router;
