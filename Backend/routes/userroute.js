const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { username, email, password ,walletAddress } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create new user
    const newUser = new User({ username, email, password, walletAddress });
    await newUser.save();

    res.json({
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        walletAddress,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//linking
router.post(
  "/link-wallet",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { walletAddress } = req.body;

      if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
        return res.status(400).json({ msg: "Invalid wallet address" });
      }

      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ msg: "User not found" });

      user.walletAddress = walletAddress;
      await user.save();

      res.json({ success: true, walletAddress: user.walletAddress });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ✅ Protected Profile Route
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

module.exports = router;
router.get(
  "/wallet",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ walletAddress: user.walletAddress || null });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
