const {
  getTitlesByName,
  getTitleByImdbID,
} = require("#controller/title.controller.js");

const express = require("express");
const Router = express.Router();

Router.get("/name/:name", getTitlesByName);
Router.get("/imdb/:imdbID", getTitleByImdbID);

module.exports = Router;
