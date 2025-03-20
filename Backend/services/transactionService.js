// transactionService.js

const Transaction = require("../models/transaction");

async function createTransaction(data) {
  const transaction = new Transaction(data);
  return await transaction.save();
}

async function getTransactionById(id) {
  return await Transaction.findById(id);
}

async function listUserTransactions(userId) {
  return await Transaction.find({ userId });
}

module.exports = {
  createTransaction,
  getTransactionById,
  listUserTransactions,
};
