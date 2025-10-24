import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//dotenv.config(); // Charger les variables d'environnement

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("");
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
