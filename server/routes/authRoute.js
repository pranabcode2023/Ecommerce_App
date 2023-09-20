import express from "express";

import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getALLOrdersController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object

const router = express.Router();

//routing

//Register|| POST METHOD
router.post("/register", registerController);

//Login||  POST METHOD
router.post("/login", loginController);

//Forget Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile-update", requireSignIn, updateProfileController);

// Orders
router.get("/orders", requireSignIn, getOrdersController);

// All Orders for Admin
router.get("/all-orders", requireSignIn, isAdmin, getALLOrdersController);

export default router;
