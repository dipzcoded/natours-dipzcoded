const express = require("express");
const router = express.Router();
const reviewRouter = require("./reviews");
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  resizeTourImages,
  uploadTourImages
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

// Post /tour/tourid/review
router.use("/:tourId/reviews", reviewRouter);

// get top cheap tours
router.route("/top-5-cheap").get(aliasTopTours, getAllTours);

// Tour statistics
router.route("/tour-stats").get(getTourStats);
router
  .route("/monthly-plan/:year")
  .get(
    authRouting,
    restrictRouting("admin", "lead-guide", "guide"),
    getMonthlyPlan
  );

// Geospatial
router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(getToursWithin);

router.route("/distances/:latlng/unit/:unit").get(getDistances);

// getting all tours and creating tours
router
  .route("/")
  .get(getAllTours)
  .post(
    [
      authRouting,
      restrictRouting("admin", "lead-guide"),
      validateFields,
      checkValidators,
    ],
    createTour
  );

  // restrictRouting("admin", "lead-guide", "user")


router
  .route("/:id")
  .get(getTour)
  .patch(
    authRouting,
    restrictRouting("admin", "lead-guide"),
    validateUpdateField,
    uploadTourImages,
    resizeTourImages,
    updateTour
  )
  .delete(authRouting, restrictRouting("admin", "lead-guide"), deleteTour);

module.exports = router;
