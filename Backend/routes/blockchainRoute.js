const express = require("express");
const blockchainController = require("../controllers/blockchainController");

const router = express.Router();

// Get wallet balance (ETH or other ERC-20 tokens)
router.get("/balance/:address", blockchainController.getBalance);

// Create a transaction (ETH or ERC-20)
router.post("/transaction", blockchainController.createTransaction);

// Fetch transaction details
router.get("/transaction/:txHash", blockchainController.getTransactionDetails);

// // Route to fetch real-time crypto price (Optional, requires API integration)
// router.get("/price/:crypto", blockchainController.getCryptoPrice);

module.exports = router;
