const mongoose = require("mongoose");

const passwordHistorySchema = mongoose.Schema({
  passwordHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,  // Ensure usernames are unique
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure emails are unique
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  loginAttempts: {
    type: Number,
    default: 0,  // Track the number of failed login attempts
  },
  lockUntil: {
    type: Date,  // Account lockout expiration date
  },
  lastPasswordChange: {
    type: Date,
    default: Date.now,  // Track the last time the password was changed
  },
  passwordHistory: [passwordHistorySchema],  // Store password history directly in the user document
});

// Reset login attempts and lock status if the lock has expired
userSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;

