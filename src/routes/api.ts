import express from "express";
import { helloWorldController } from "../controllers";

const api = express.Router();

api.use("/hello-world", helloWorldController);

export default api;
