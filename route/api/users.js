const express = require("express");
const router = express.Router();

// Middlewares
const {
  authRouting,
  comparePasswordandRoles,
} = require("../../middlewares/authMiddleware");

const {
  updatePasswordValidation,
} = require("../../middlewares/userMiddlewares");

// Handlers
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require("../../controllers/userController");

const {
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../../controllers/authController");

// Routing
router.route("/forgotPassword").post(forgotPassword);
router
  .route("/resetPassword/:token")
  .patch(comparePasswordandRoles, resetPassword);
router
  .route("/updateMyPassword")
  .patch(authRouting, updatePasswordValidation, updatePassword);
router.route("/updateMe").patch(authRouting, updateMe);
router.route("/deleteMe").delete(authRouting, deleteMe);
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
