const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },

  photo: {
    type: String,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },

  confirmPassword: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
