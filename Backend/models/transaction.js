const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    amount: {
      type: String, // Store amount as a string to avoid BigInt serialization issues
      required: true,
    },
    txHash: {
      type: String,
      unique: true,
      sparse: true, // Allows txHash to be optional during initial creation
    },
    paymentMethod: {
      type: String,
      enum: ["ETH", "USDT", "UPI", "Bank Transfer"],
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "FAILED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
