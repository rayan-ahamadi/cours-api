const {
    updateUser,
    deleteUser,
} = require("#controller/user.controller.js");
const express = require("express");
const authMiddleware = require("#middleware/authMiddleware.js");
const { body } = require("express-validator");

const Router = express.Router();

Router.put("/user/:user.id", authMiddleware, updateUser);
Router.delete("/user/:user.id", authMiddleware, deleteUser);