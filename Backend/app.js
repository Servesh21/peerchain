const express = require("express");
const passport = require("./config/passport");
const userRoute = require("./routes/userroute");
const blockchainRoutes = require("./routes/blockchainRoute");
const cors = require("cors");
const connectDB = require("./db");
connectDB();

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use(cors({
  origin: "*", // Allow all origins (for development)
  methods: ["GET", "POST"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type"] // Allowed headers
}));

// Routes
app.use("/api/user", userRoute);

// Add this route under your userRoutes:
app.use("/api/blockchain", blockchainRoutes);

app.listen(5500, () => {
  console.log("API running on port 5500");
});
