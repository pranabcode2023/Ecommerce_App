import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware";
import { createProductController } from "../controllers/productController";

const router = express.Router();
// routes
router.post("/create-product", requireSignIn, isAdmin, createProductController);

export default router;
