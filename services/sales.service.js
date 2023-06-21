import OverallStat from "../models/OverallStat.js";

export const getSalesConsolidated = async () => {
  try {
    const overallStat = await OverallStat.find();
    return overallStat;
  } catch (error) {
    res.status(404).json(error.message);
  }
};
