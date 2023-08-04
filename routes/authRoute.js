import express from "express";

import { registerController, loginController, testController, } from '../controllers/authController.js'
//router object

const router = express.Router()

//routing

//Register|| POST METHOD
router.post('/register', registerController)

//Login||  POST METHOD
router.post('/login', loginController)

router.get('/test', testController)

export default router;