const express = require("express");
const router = express.Router();
const passport = require("passport");
const blockchainController = require("../controllers/blockchainController");

// POST /api/blockchain/transaction - Send a transaction (protected route)
router.post(
  "/transaction",
  passport.authenticate("jwt", { session: false }),
  blockchainController.createTransaction
);

// GET /api/blockchain/history/:address - Fetch transaction history (protected)
router.get(
  "/history/:address",
  passport.authenticate("jwt", { session: false }),
  blockchainController.getTransactionDetails
);

// GET /api/blockchain/balance/:address - Get wallet balance (protected)
router.get(
  "/balance/:address",
  passport.authenticate("jwt", { session: false }),
  blockchainController.getBalance
);

module.exports = router;
