import {
  getAllAdmins,
  getPerformanceById,
} from "../services/management.service.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    const performance = await getPerformanceById(id);
    res.status(200).json(performance);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
