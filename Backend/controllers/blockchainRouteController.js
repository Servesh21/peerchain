// blockchainRouteController.js

const blockchainService = require("../services/blockchainService");

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

module.exports = { createTransaction, getTransactionDetails };
