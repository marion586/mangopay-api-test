const { createWallet, getWallet } = require("../services/mangopayService");

const createWalletHandler = async (req, res) => {
  try {
    const { userId, currency, description, tag } = req.body;
    console.log(req.body);
    if (!userId || !currency || !description) {
      return res.status(400).json({
        message: "Missing required fields: userId, currency, description.",
      });
    }

    const walletObject = {
      Owners: [userId],
      Currency: currency,
      Description: description,
      Tag: tag || "Default wallet tag",
    };
    const wallet = await createWallet(walletObject);

    res.status(201).json({
      message: "Wallet created successfully",
      data: wallet,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const viewWalletHandler = async (req, res) => {
  try {
    const { walletId } = req.params;
    console.log(walletId);
    // Validate input
    if (!walletId) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: walletId." });
    }

    // Retrieve the wallet using the service
    const wallet = await getWallet(walletId);

    res.status(200).json({
      message: "Wallet retrieved successfully",
      data: wallet,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createWalletHandler,
  viewWalletHandler,
};
