import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "@entities/user/user.routes.js";

//dotenv.config(); // Charger les variables d'environnement

const app = express();
const port = process.env.PORT || 3000;

// Configuration
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("");
});

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
