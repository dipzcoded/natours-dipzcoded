const express = require("express");
const router = express.Router();
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
} = require("../../controllers/tourController");

// tour  custom middlewares
const {
  validateFields,
  aliasTopTours,
  checkValidators,
  validateUpdateField,
} = require("./../../middlewares/tourMiddleware");

// auth middleware
const {
  authRouting,
  restrictRouting,
} = require("../../middlewares/authMiddleware");

// get top cheap tours
router.route("/top-5-cheap").get(aliasTopTours, getAllTours);

// Tour statistics
router.route("/tour-stats").get(getTourStats);
router.route("/monthly-plan/:year").get(getMonthlyPlan);

// getting all tours and creating tours
router
  .route("/")
  .get(authRouting, getAllTours)
  .post([validateFields, checkValidators], createTour);
router
  .route("/:id")
  .get(getTour)
  .patch(validateUpdateField, updateTour)
  .delete(authRouting, restrictRouting("admin", "lead-guide"), deleteTour);

module.exports = router;
