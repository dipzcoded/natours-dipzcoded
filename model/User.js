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
  passwordChangedAt: Date,
});

userSchema.methods.changePasswordAfter = function (jWTTimestamp) {
  if (this.passwordChangedAt) {
    const changeTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jWTTimestamp < changeTimestamp;
  }

  return false;
};

module.exports = mongoose.model("user", userSchema);
