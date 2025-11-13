const express = require("express");
const appV1 = express();
const userRouter = require("./entities/user/user.routes.js");
//const userProtectedRouter = require("./entities/user/user.protected.routes.js");

// const titleRouter = require("./entities/title/title.routes.js");
//const titleProtectedRouter = require("./entities/title/title.protected.routes.js");

// const ratingRouter = require("./entities/rating/rating.routes.js");
//const ratingProtectedRouter = require("./entities/rating/rating.protected.routes.js");

appV1.use("/user", userRouter);
//appV1.use("/user/protected", userProtectedRouter);

// appV1.use("/title",  titleRouter);
//appV1.use("/title/protected", titleProtectedRouter);

// appV1.use("/rating", ratingRouter);
//appV1.use("/rating/protected", ratingProtectedRouter);

exports = appV1;
