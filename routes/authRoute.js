import express from "express";


//router object

const router = express.Router()

//routing

//Register|| METHOD POST
router.post('/register', registerController)

export default router;