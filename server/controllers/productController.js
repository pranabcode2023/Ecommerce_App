import productModel from "./../models/productModel.js";

// fs = file system .its integrated with node , don't need to install extra package
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    // to get other information except photo from product schema
    const { name, slug, description, price, category, quantity, Shipping } =
      req.fields;

    // to get photo from product schema
    const { photo } = req.files;

    const products = await productModel;
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};
