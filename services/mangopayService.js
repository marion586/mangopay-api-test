const getMangopayInstance = require("../utils/mangopayInstance");

const createWallet = async (walletObject) => {
  try {
    const mangopay = await getMangopayInstance();
    console.log(mangopay);
    const wallet = await mangopay.Wallets.create(walletObject);
    return wallet;
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw new Error("Failed to create wallet. Please try again later.");
  }
};

const getWallet = async (walletId) => {
  try {
    const mangopay = await getMangopayInstance();
    const wallet = await mangopay.Wallets.get(walletId);
    return wallet;
  } catch (error) {
    console.error("Error retrieving wallet:", error);
    throw new Error("Failed to retrieve wallet. Please try again later.");
  }
};
module.exports = {
  createWallet,
  getWallet,
};
