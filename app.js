const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRouter = require("#entities/user/user.routes.js");

//dotenv.config(); // Charger les variables d'environnement

const app = express();
const port = process.env.PORT || 3000;

// Configuration
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("lol");
});

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
