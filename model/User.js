const crypto = require("crypto");
const mongoose = require("mongoose");
const { updatePassword } = require("../controllers/authController");

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
  role: {
    type: String,
    default: "user",
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Document Middleware
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Query Middleware
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });

  next();
});

// Methods - instance
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

// Methods - instance
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
