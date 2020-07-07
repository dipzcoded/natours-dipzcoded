const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  rating: {
    type: Number,
    default: 4.5,
  },

  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Tour", TourSchema);
