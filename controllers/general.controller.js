import {
  getUserById,
  getAllDashboardStats,
} from "../services/general.service.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const dashboardStats = await getAllDashboardStats();
    res.status(200).json(dashboardStats);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export default getUser;
