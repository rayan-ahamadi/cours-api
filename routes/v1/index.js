const express = require("express");
const YAML = require("yamljs");
const swaggerUi = require("#swagger/v1/swagger.js").swaggerUi;
const swaggerSpec = require("#swagger/v1/swagger.js").swaggerSpec;

const swaggerDocument = YAML.load("./swagger/v1/openapi.yaml");

const router = express.Router();

/* Routeurs de la V1 */
const userRouter = require("./entities/user/user.routes.js");
// const userProtectedRouter = require("./entities/user/user.protected.routes.js");

const titleRouter = require("./entities/title/title.routes.js");
// const titleProtectedRouter = require("./entities/title/title.protected.routes.js");

const ratingRouter = require("./entities/rating/rating.routes.js");
const ratingProtectedRouter = require("./entities/rating/rating.protected.routes.js");

/* Routes de la V1*/

router.use("/user", userRouter);
// router.use("/user/protected", userProtectedRouter);

router.use("/title", titleRouter);
// router.use("/title/protected", titleProtectedRouter);

router.use("/rating", ratingRouter);
router.use("/rating/protected", ratingProtectedRouter);

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
