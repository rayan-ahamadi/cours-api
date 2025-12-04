const express = require("express");

// Export an Express Router so it can be mounted by the main app
const router = express.Router();
const userRouter = require("./entities/user/user.routes.js");
// const userProtectedRouter = require("./entities/user/user.protected.routes.js");

const titleRouter = require("./entities/title/title.routes.js");
// const titleProtectedRouter = require("./entities/title/title.protected.routes.js");

const ratingRouter = require("./entities/rating/rating.routes.js");
// const ratingProtectedRouter = require("./entities/rating/rating.protected.routes.js");

router.use("/user", userRouter);
// router.use("/user/protected", userProtectedRouter);

router.use("/title", titleRouter);
// router.use("/title/protected", titleProtectedRouter);

router.use("/rating", ratingRouter);
// router.use("/rating/protected", ratingProtectedRouter);

module.exports = router;
