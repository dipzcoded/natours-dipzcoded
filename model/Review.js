const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// query middleware
reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name" });

  next();
});

module.exports = mongoose.model("Review", reviewSchema);
