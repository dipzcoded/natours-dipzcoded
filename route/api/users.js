const express = require("express");
const router = express.Router();

// Middlewares
const {
  authRouting,
  comparePasswordandRoles,
  restrictRouting,
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
  uploadUserPhoto,
  resizeUserPhoto
} = require("../../controllers/userController");

const {
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../../controllers/authController");
// const { route } = require("./auth");



// Routing
router.route("/forgotPassword").post(forgotPassword);
router
  .route("/resetPassword/:token")
  .patch(comparePasswordandRoles, resetPassword);

// protecting the route that comes after this middleware
router.use(authRouting);
router
  .route("/updateMyPassword")
  .patch(updatePasswordValidation, updatePassword);
router.route("/updateMe").patch(uploadUserPhoto,resizeUserPhoto,updateMe);
router.route("/deleteMe").delete(deleteMe);

// restricting the route to only admins  only
router.use(restrictRouting("admin"));
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
