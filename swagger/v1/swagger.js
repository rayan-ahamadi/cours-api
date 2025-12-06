const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Cours Express + Prisma",
      version: "1.0.0",
      description: "Documentation de l'API Express utilisant Prisma",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: ["./routes/v1/**/*.js", "./controller/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
