const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
  },

  maxGroupSize: {
    type: Number,
    required: true,
  },

  difficulty: {
    type: String,
    required: [true],
  },

  ratingsAverage: {
    type: Number,
    default: 4.5,
  },

  ratingsQuantity: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    required: true,
  },

  priceDiscount: {
    type: Number,
  },

  summary: {
    type: String,
    trim: true,
    required: true,
  },

  description: {
    type: String,
    trim: true,
  },

  imageCover: {
    type: String,
    required: true,
  },

  images: {
    type: [String],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  startDates: {
    type: [Date],
  },
});

module.exports = mongoose.model("Tour", TourSchema);
