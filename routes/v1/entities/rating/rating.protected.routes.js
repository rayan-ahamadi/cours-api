const {} = require("#controller/rating.controller.js");
const express = require("express");
const authMiddleware = require("#middleware/authMiddleware.js");
const { body } = require("express-validator");

const Router = express.Router();

module.exports = Router;
