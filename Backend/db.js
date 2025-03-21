const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/PeerChain", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully ✅");
  } catch (err) {
    console.error("MongoDB Connection Error ❌", err);
    process.exit(1);
  }
};

module.exports = connectDB;
