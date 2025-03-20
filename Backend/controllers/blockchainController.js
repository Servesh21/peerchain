const blockchainService = require("../services/blockchainService");
const { Web3 } = require("web3");
require("dotenv").config();
const Transaction = require("../models/transaction");

// Initialize Web3 with Infura or Alchemy
const web3 = new Web3(process.env.ALCHEMY_SEPOLIA_URL);


/**
 * @desc Get wallet balance
 * @route GET /api/blockchain/balance/:address
 */
const getBalance = async (req, res) => {
  try {
    const { address } = req.params;

    if (!web3.utils.isAddress(address)) {
      return res.status(400).json({ message: "Invalid wallet address" });
    }

    const balanceWei = await web3.eth.getBalance(address);
    const balanceEther = web3.utils.fromWei(balanceWei, "ether");

    return res.status(200).json({ address, balance: balanceEther, unit: "ETH" });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * @desc Create a transaction object (User signs in MetaMask)
 * @route POST /api/blockchain/transaction
 */

const createTransaction = async (req, res) => {
  try {
    const { sender, privateKey, to, value } = req.body;

    console.log("Received Transaction Data:", { sender, privateKey, to, value });

    if (!sender || !privateKey || !to || !value) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const receipt = await blockchainService.signAndSendTransaction({ sender, privateKey, to, value });

    return res.status(201).json({ message: "Transaction successful", receipt });
  } catch (error) {
    console.error("Transaction error:", error);
    return res.status(500).json({ message: "Transaction failed", error: error.message });
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

    return res.status(200).json({ message: "Transaction details fetched successfully", txDetails });
  } catch (error) {
    console.error("Fetch transaction details error:", error);
    return res.status(500).json({ message: "Error fetching transaction", error: error.message });
  }
};

module.exports = { createTransaction, getTransactionDetails, getBalance };
