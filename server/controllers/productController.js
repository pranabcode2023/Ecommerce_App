import productModel from "./../models/productModel.js";

export const createProductController = async (req, res) => {
  try {
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
