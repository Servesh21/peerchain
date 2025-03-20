// userService.js

const User = require("../models/user");

async function registerUser(userData) {
  const user = new User(userData);
  return await user.save();
}

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

async function updateUserProfile(userId, updateData) {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
}

module.exports = { registerUser, findUserByEmail, updateUserProfile };
