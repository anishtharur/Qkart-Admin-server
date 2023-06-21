import { getSalesConsolidated } from "../services/sales.service.js";

export const getSales = async (req, res) => {
  try {
    //only status of 2021 there hence hardcoding
    const overallStat = await getSalesConsolidated();
    res.status(200).json(overallStat[0]);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
