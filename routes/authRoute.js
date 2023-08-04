import express from "express";

import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object

const router = express.Router();

//routing

//Register|| POST METHOD
router.post("/register", registerController);

//Login||  POST METHOD
router.post("/login", loginController);

router.get("/test", requireSignIn, isAdmin, testController);

export default router;
