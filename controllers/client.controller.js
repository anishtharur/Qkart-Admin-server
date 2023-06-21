import {
  getAllProducts,
  getProductStatsAll,
  getAllCustomers,
  getAllTransactions,
  getTotalPages,
  getAllGeographyData,
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

export const getTransactions = async (req, res) => {
  try {
    //sort should look like: {"field" : "userId" , "sort" : "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    //formatted sort should look like {userId : -1}
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.feild]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await getAllTransactions(
      page,
      pageSize,
      sortFormatted,
      search
    );
    const totalPages = await getTotalPages(search);

    res.status(200).json({ transactions, totalPages });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const getGeography = async (req, res) => {
  try {
    const locationWiseReport = await getAllGeographyData();
    res.status(200).json(locationWiseReport);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
