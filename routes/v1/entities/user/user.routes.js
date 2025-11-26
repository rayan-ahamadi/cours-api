const {
  registerUser,
  login,
  getUsers,
} = require("#controller/user.controller.js");
const express = require("express");
const { body } = require("express-validator");

const Router = express.Router();

Router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

Router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);
Router.get("/users", getUsers);

module.exports = Router;
