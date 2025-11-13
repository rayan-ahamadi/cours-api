import { register, login, getUsers } from "./user.controller";
import express from "express";

const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);
Router.get("/users", getUsers);

export default Router;
