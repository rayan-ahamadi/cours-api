const {
  rateTitle,
  updateRating,
  deleteRating,
} = require("#controller/rating.controller.js");
const express = require("express");
const authMiddleware = require("#middlewares/authMiddleware.js");

const Router = express.Router();

Router.post("/rate", authMiddleware, rateTitle);
Router.put("/update/:ratingId", authMiddleware, updateRating);
Router.delete("/delete/:ratingId", authMiddleware, deleteRating);

module.exports = Router;
