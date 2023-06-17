import {
  getAllProducts,
  getProductStatsAll,
  getAllCustomers,
} from "../services/client.service.js";

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    const productsWithStats = await getProductStatsAll(products);
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
