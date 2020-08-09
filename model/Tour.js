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
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Populate
// This allows us to do child referencing on the background
TourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id",
});

// creating a virtual property
TourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// Embedding documents
// TourSchema.pre('save', async function(next){

//  const guidesPromises = this.guides.map(async id => await User.findById(id))
//  this.guides = await Promise.all(guidesPromises);
//   next();

// })

// Document Middleware : runs before save() and create()
TourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

// Query Middleware
TourSchema.pre(/^find/, function (next) {
  this.populate("guides", ["-__v", "-passwordChangedAt"]);

  next();
});

TourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

TourSchema.post(/^find/, function (docs, next) {
  // console.log(docs);
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
