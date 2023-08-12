import mongoose from "mongoose";

const productSchema = new mongoose.schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    //to get information type + ref get from categoryModel
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    photo: {
      type: Buffer,
      contentType: String,
    },

    Shipping: {
      type: Boolean,
    },
  },
  { timestams }
);

const productModel = mongoose.model("Products", productSchema);

export default productModel;
