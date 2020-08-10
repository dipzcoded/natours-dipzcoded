const Review = require("../model/Review");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAllOne,
} = require("./factoryHandler");

// getting all reviews
exports.getTourReviews = getAllOne(Review);

// getting a review
exports.getReview = getOne(Review);

// creting review
exports.createReviews = createOne(Review);

// update Reviews
exports.updateReviews = updateOne(Review);

// delete Reviews
exports.deleteReviews = deleteOne(Review);
