const express = require("express");
const router = express.Router();
// Middlewares
const {
  loginValidation,
  signUpValidation,
  comparePasswordandRoles,
  authRouting,
} = require("../../middlewares/authMiddleware");

// Handlers
const {
  signUp,
  getLoginUser,
  logIn,
} = require("../../controllers/authController");

// Routing

router.route("/login").post(loginValidation, logIn);
// router.route("/login").post(loginValidation, logIne);
router
  .route("/signup")
  .post([signUpValidation, comparePasswordandRoles], signUp);

// protecting the route that comes after this middleware
router.use(authRouting);
router.route("/user").get(getLoginUser);

module.exports = router;
