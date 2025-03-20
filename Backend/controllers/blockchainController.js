// blockchainRouteController.js

const blockchainService = require("../services/blockchainService");
const Web3 = require("web3");

// Connect to your blockchain node (e.g., Ganache, Infura, Alchemy)
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// Replace URL with your blockchain provider (e.g., Infura RPC URL for Ethereum)

// GET wallet balance controller
const getBalance = async (req, res) => {
  try {
    const { address } = req.params;

    if (!web3.utils.isAddress(address)) {
      return res.status(400).json({ message: "Invalid wallet address" });
    }

    const balanceWei = await web3.eth.getBalance(address);
    const balanceEther = web3.utils.fromWei(balanceWei, "ether");

    return res.status(200).json({
      address,
      balance: balanceEther,
      unit: "ETH",
    });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc Create a new blockchain transaction
 * @route POST /api/blockchain/transaction
 */
const createTransaction = async (req, res) => {
  try {
    const { to, value } = req.body;

    // Validate input
    if (!to || !value) {
      return res
        .status(400)
        .json({ message: "Missing 'to' address or 'value'." });
    }

    // Call blockchain service
    const txHash = await blockchainService.sendToBlockchain({ to, value });

    return res.status(201).json({
      message: "Transaction sent successfully",
      txHash,
    });
  } catch (error) {
    console.error("Blockchain transaction error:", error);
    return res
      .status(500)
      .json({ message: "Transaction failed", error: error.message });
  }
};

/**
 * @desc Get blockchain transaction details
 * @route GET /api/blockchain/transaction/:txHash
 */
const getTransactionDetails = async (req, res) => {
  try {
    const { txHash } = req.params;

    if (!txHash) {
      return res.status(400).json({ message: "Missing transaction hash." });
    }

    const txDetails = await blockchainService.getTransactionDetails(txHash);

    return res.status(200).json({
      message: "Transaction details fetched successfully",
      txDetails,
    });
  } catch (error) {
    console.error("Fetch transaction details error:", error);
    return res
      .status(500)
      .json({ message: "Error fetching transaction", error: error.message });
  }
};

module.exports = { createTransaction, getTransactionDetails, getBalance };
