import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protect routes token base/this middleware  check for token

export const requireSignIn = async (req, res, next) => {
  try {
    // jwt verify fuction
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in token  middelware",
    });
  }
};

//admin access/this middleware  check for role /admin

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      // Number 1 stand for admin
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);

    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
