const mongoose = require("mongoose");
const slugify = require("slugify");

const TourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 40,
      minlength: 10,
    },
    slug: {
      type: String,
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
      required: true,
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
      select: false,
    },

    startDates: {
      type: [Date],
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// creating a virtual property
TourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// Document Middleware : runs before save() and create()
TourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

// Query Middleware
TourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

TourSchema.post(/^find/, function (docs, next) {
  console.log(docs);
  console.log(`Time took was ${Date.now() - this.start} milliseconds`);
  next();
});

// Aggregation Middleware
TourSchema.pre("aggregate", function (next) {
  console.log(this.pipeline());
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  next();
});

// TourSchema.post("save", function (docs, next) {
//   console.log(docs);
//   next();
// });

module.exports = mongoose.model("Tour", TourSchema);
