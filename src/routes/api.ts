import express from "express";
import { example } from "../controllers";

const api = express.Router();

api.use("/example", example);

export default api;
