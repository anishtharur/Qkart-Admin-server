import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
};

export const getProductStatsAll = async (products) => {
  try {
    const productWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    return productWithStats;
  } catch (error) {
    throw error;
  }
};
