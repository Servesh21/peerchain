const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Not authenticated" });
};

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { username, email, password, walletAddress } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create new user
    const newUser = new User({ username, email, password, walletAddress });
    await newUser.save();

    // Log the user in after registration
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json({
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          walletAddress,
        },
        isAuthenticated: true
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Login Route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!user) {
      return res.status(401).json({ error: info.message || "Invalid credentials" });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          walletAddress: user.walletAddress,
        },
        isAuthenticated: true
      });
    });
  })(req, res, next);
});

// ✅ Logout Route
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.clearCookie('connect.sid');
      res.json({ message: "Logged out successfully" });
    });
  });
});

// ✅ Check Authentication Status
router.get("/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        walletAddress: req.user.walletAddress,
      }
    });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// ✅ Get User Profile (Protected Route)
router.get("/profile", isAuthenticated, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      walletAddress: req.user.walletAddress,
    }
  });
});

module.exports = router;
