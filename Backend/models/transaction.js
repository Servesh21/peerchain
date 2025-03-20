const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(18, 8), // Supports large decimal values
      allowNull: false,
    },
    txHash: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "CONFIRMED", "FAILED"),
      defaultValue: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Transaction;
