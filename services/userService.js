const getMangopayInstance = require("../utils/mangopayInstance");

// Create user
const createUser = async (userObject) => {
  try {
    const mangopay = await getMangopayInstance();
    const user = await mangopay.Users.create(userObject);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user. Please try again later.");
  }
};

// Update user
const updateUser = async (userObject) => {
  try {
      const mangopay = await getMangopayInstance();
    const user = await mangopay.Users.update(userObject);
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user. Please try again later.");
  }
};

// Get user by ID
const getUser = async (userId) => {
  try {
      const mangopay = await getMangopayInstance();
    const user = await mangopay.Users.get(userId);
    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw new Error("Failed to retrieve user. Please try again later.");
  }
};

// Delete user by ID
const deleteUser = async (userId) => {
  try {
      const mangopay = await getMangopayInstance();
    const user = await mangopay.Users.delete(userId);
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user. Please try again later.");
  }
};
const getUserEMoneyService= async (userId, year, month) => {
  try {
    const mangopay = await getMangopayInstance();
    const response = await mangopay.Users.getEMoney(userId, year, month);
    return response;
  } catch (error) {
    console.error('Error fetching user e-money:', error);
    throw new Error('Failed to retrieve user e-money.');
  }
};

module.exports = {
  createUser,
  updateUser,
  getUser,
  deleteUser,
  getUserEMoneyService
};
