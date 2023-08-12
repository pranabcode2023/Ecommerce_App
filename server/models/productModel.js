import mongoose from "mongoose";

const productSchema = new mongoose.schema({});

const productModel = mongoose.model("products", productSchema);

export default productModel;
