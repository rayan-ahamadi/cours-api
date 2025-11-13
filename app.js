const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const appV1 = require("./routes/v1/index.js");

//dotenv.config(); // Charger les variables d'environnement

const app = express();
const port = process.env.PORT || 3000;

// Configuration
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", appV1);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
