const express = require("express");
const passport = require("./config/passport");
const userRoute = require("./routes/userroute");
const blockchainRoutes = require("./routes/blockchainRoute");
const cors = require("cors");
const connectDB = require("./db");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
require("dotenv").config();

connectDB();

// Configure MongoDB session store
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/PeerChain',
  collection: 'sessions'
});

// Handle store errors
store.on('error', function(error) {
  console.log('Session store error:', error);
});

const app = express();
app.use(express.json());
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
  },
  store: store,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); // Enable session support for passport

// Configure CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:8081",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // Allow credentials (cookies)
}));

// Routes
app.use("/api/user", userRoute);

// Add this route under your userRoutes:
app.use("/api/blockchain", blockchainRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT} ✅`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL} 🌐`);
});
