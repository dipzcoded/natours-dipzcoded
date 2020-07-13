const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  validateFields,
} = require("../../controllers/tourController");

//
const checkValidators = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("A tour must have a name")
    .isLength({ min: 10 })
    .withMessage("A tour name must be more or equal to 10 characters")
    .isLength({ max: 40 })
    .withMessage("A tour name must be less or equal to 40 characters"),
  check("price", "A tour must have a price").exists(),
  check("duration", "A tour must have a duration").exists(),
  check("maxGroupSize", "A tour must have a max group size").exists(),
  check("summary", "A tour must have a description").not().isEmpty(),
  check("imageCover", "A tour must have a image cover").not().isEmpty(),
];

// Params middleware
// router.param("id", checkId);

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
