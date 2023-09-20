import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Not Process",
      //NOTE - enum is method that way multiple things you can add
      enum: [
        "Not Process",
        "Processing",
        "Not Process",
        "Shipped",
        "Deliverd",
        "Cancel",
      ],
    },
  },
  { timestamps: true }
);

// categoryModel export method  easiet way to understand
const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
