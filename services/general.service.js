import User from "../models/User.js";

export const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw error;
  }
};
