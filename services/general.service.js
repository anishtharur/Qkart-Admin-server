import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

export const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw error;
  }
};

export const getAllDashboardStats = async () => {
  try {
    //hardcoded values
    const currMonth = "November";
    const currYear = 2021;
    const currDay = "2021-11-15";
    //hardcoded values

    /*Recent transactions*/
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /*Overall Stats*/
    const overallStat = await OverallStat.find({ year: currYear });
    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStat = overallStat[0].monthlyData.find(
      ({ month }) => month === currMonth
    );

    const todayStat = overallStat[0].dailyData.find(
      ({ date }) => date === currDay
    );

    return {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStat,
      todayStat,
      transactions,
    };
  } catch (error) {
    throw error;
  }
};
