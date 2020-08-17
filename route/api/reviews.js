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

//  protecting the route that comes after this middleware
router.use(authRouting);

// Routing
router
  .route("/")
  .get(getTourReviews)
  .post(
    [
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
router
  .route("/:tourId")
  .post(
    [
      restrictRouting("user"),
      checkRating,
      [
        check("review", "A review is required").not().isEmpty(),
        check("rating", "A rating is required").exists(),
      ],
    ],
    createReviews
  );

router
  .route("/:id")
  .get(getReview)
  .patch(restrictRouting("user", "admin"), updateReviews)
  .delete(restrictRouting("user", "admin"), deleteReviews);

module.exports = router;
