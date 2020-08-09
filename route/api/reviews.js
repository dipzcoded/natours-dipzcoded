const express = require("express");
const router = express.Router({ mergeParams: true });
const { check } = require("express-validator");

// controllers
const {
  getAllReviews,
  createReviews,
} = require("../../controllers/reviewController");

// middlewares
const {
  authRouting,
  restrictRouting,
} = require("../../middlewares/authMiddleware");
const { checkRating } = require("../../middlewares/reviewMiddleware");

// Routing
router.route("/").get(getAllReviews);
router
  .route("/")
  .post(
    [
      authRouting,
      restrictRouting("user"),
      checkRating,
      [
        check("review", "A review is required").not().isEmpty(),
        check("rating", "A rating is required").exists(),
      ],
    ],
    createReviews
  );

module.exports = router;
