import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAllAdmins = async () => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    return admins;
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const getPerformanceById = async (id) => {
  try {
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    console.log(saleTransactions);
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    return { user: userWithStats, sales: filteredSaleTransactions };
  } catch (error) {
    res.status(404).json(error.message);
  }
};
