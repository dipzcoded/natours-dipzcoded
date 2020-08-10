const express = require("express");
const router = express.Router({ mergeParams: true });
const { check } = require("express-validator");

// controllers
const {
  getTourReviews,
  createReviews,
  deleteReviews,
  updateReviews,
  getReview,
} = require("../../controllers/reviewController");

// middlewares
const {
  authRouting,
  restrictRouting,
} = require("../../middlewares/authMiddleware");
const {
  checkRating,
  checkUserAndTourIds,
} = require("../../middlewares/reviewMiddleware");

// Routing
router.route("/").get(getTourReviews);
router
  .route("/:tourId")
  .post(
    [
      authRouting,
      restrictRouting("user"),
      checkUserAndTourIds,
      checkRating,
      [
        check("review", "A review is required").not().isEmpty(),
        check("rating", "A rating is required").exists(),
      ],
    ],
    createReviews
  );

router.route("/:id").get(getReview).patch(updateReviews).delete(deleteReviews);

module.exports = router;
