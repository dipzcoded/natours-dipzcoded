const express = require("express");
const router = express.Router();
// Middlewares
const {
  loginValidation,
  signUpValidation,
  comparePassword,
} = require("../../middlewares/authMiddleware");

// Handlers
const { logIn } = require("../../controllers/authController");
const { signUp } = require("../../controllers/authController");

// Routing
router.route("/login").post(loginValidation, logIn);
router.route("/signup").post([signUpValidation, comparePassword], signUp);

module.exports = router;
