import express from "express";
import { getProducts } from "../controllers/client.controller.js";
const router = express.Router();

router.get("/products", getProducts);

export default router;
