import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

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

export const getAllCustomers = async () => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    return customers;
  } catch (error) {
    throw error;
  }
};

export const getAllTransactions = async (
  page,
  pageSize,
  sortFormatted,
  search
) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);
    return transactions;
  } catch (error) {
    throw error;
  }
};

export const getTotalPages = async (search) => {
  try {
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const total = await Transaction.countDocuments(query);
    return total;
  } catch (error) {
    throw error;
  }
};

export const getAllGeographyData = async (search) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    return formattedLocations;
  } catch (error) {
    throw error;
  }
};
