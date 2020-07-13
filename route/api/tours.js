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
} = require("./../../middlewares/tourMiddleware");

// get top cheap tours
router.route("/top-5-cheap").get(aliasTopTours, getAllTours);

// Tour statistics
router.route("/tour-stats").get(getTourStats);
router.route("/monthly-plan/:year").get(getMonthlyPlan);

// getting all tours and creating tours
router
  .route("/")
  .get(getAllTours)
  .post([validateFields, checkValidators], createTour);
router
  .route("/:id")
  .get(getTour)
  .patch([validateFields, checkValidators], updateTour)
  .delete(deleteTour);

module.exports = router;
