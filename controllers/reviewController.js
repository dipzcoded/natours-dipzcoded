const Tour = require("../model/Tour");
const User = require("../model/User");
const Review = require("../model/Review");
const { validationResult } = require("express-validator");

// getting all reviews
exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find().populate("reviews");

  res.status(200).json({
    status: "success",
    result: reviews.length,
    data: {
      reviews,
    },
  });
};

// creting review
exports.createReviews = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const tourID = req.params.tourId;

  if (!tourID) {
    return res.status(400).json({ msg: "invalid tour id" });
  }

  const tourData = await Tour.findById(tourID);
  if (!tourData) {
    return res.status(400).json({ msg: "invalid tour id" });
  }

  const { review, rating } = req.body;

  const reviewObj = {};

  reviewObj.review = review;
  reviewObj.rating = rating;
  reviewObj.tour = tourID;
  reviewObj.user = req.user.id;

  try {
    const review = new Review(reviewObj);

    await review.save();
    res.status(201).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (error) {
    console.error(error.message);

    if ((error.kind = "ObjectId")) {
      return res.status(400).json({ msg: "invalid tour id" });
    }

    res.status(500).send("Server Error!");
  }
};
