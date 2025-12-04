const {
  getRatingsFromUser,
  getLastsRatings,
} = require("#controller/rating.controller.js");
const express = require("express");
const { body } = require("express-validator");

const Router = express.Router();

Router.get("/", getLastsRatings);
Router.get("/user/:userId", getRatingsFromUser);

module.exports = Router;
