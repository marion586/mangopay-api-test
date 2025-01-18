const express = require("express");
const {
  createWalletHandler,
  viewWalletHandler,
} = require("../controllers/walletController");

const router = express.Router();

// POST /api/wallets
router.post("/", createWalletHandler);
router.get("/:walletId", viewWalletHandler);

module.exports = router;
