import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    rating: Number,
    supply: Number,
  },
  {
    timestamps: true,
  }
);

const Product = new mongoose.model("Product", productSchema);

export default Product;
