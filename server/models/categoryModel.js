import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

// categoryModel export method  easiet way to understand
const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
