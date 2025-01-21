import express from "express";
import { exampleController } from "@/controllers/exampleController";

const api = express.Router();

api.use("/example", exampleController);

export default api;
