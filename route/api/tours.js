const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require("../../controllers/tourController");

// Params middleware
// router.param("id", checkId);

// getting all tours and creating tours
router
  .route("/")
  .get(getAllTours)
  .post(
    [
      check("name", "A tour must have a name").not().isEmpty(),
      check("price", "A tour must have a price").exists(),
    ],
    createTour
  );
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
