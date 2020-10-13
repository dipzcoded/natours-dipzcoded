const Tour = require("../model/Tour");
const ApiError = require("../utils/apiError");
const multer = require('multer');
const sharp = require("sharp");

const {
  getOne,
  deleteOne,
  updateOne,
  createOne,
  getAllOne,
} = require("./factoryHandler");

// image stored as a buffered in memory
const multerStorage = multer.memoryStorage();

// multer filter
const multerFilter = (req, file, cb) => {

  if(file.mimetype.startsWith('image')){
    cb(null,true)
  }else
  {
    cb(new AppError("Not an image!, Please Upload only images.",400), false)
  }

} 

const upload = multer({
  storage : multerStorage,
  fileFilter : multerFilter
})

// middleware for image upload
exports.uploadTourImages = upload.fields([
  {
    name : "imageCover", maxCount : 1
  },
  {name : "images", maxCount : 3}
])


exports.resizeTourImages = async (req, res, next) =>
{

  if(!req.files.imageCover || !req.files.images) return next();
  
  // 1 Cover Image
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  req.body.images= [];
  try {
    await sharp(req.files.imageCover[0].buffer).resize(2000, 1333).toFormat('jpeg').jpeg({quality : 90}).toFile(`view/public/img/tours/${req.body.imageCover}`);
    
    await Promise.all(
      req.files.images.map(async (file, index) => {
        const fileName = `tour-${req.params.id}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(file.buffer).resize(2000, 1333).toFormat('jpeg').jpeg({quality : 90}).toFile(`view/public/img/tours/${fileName}`);
        req.body.images.push(fileName);
      })
    )  
  
    next();
   } catch (error) {
     console.log(error.message);
     res.status(500).send("Server Error!");
   }

}

// get all reviews
exports.getAllTours = getAllOne(Tour, "Tour");
// Get Tour
exports.getTour = getOne(Tour, "reviews");

// // Create Tour
exports.createTour = createOne(Tour);
// update Tour
exports.updateTour = updateOne(Tour);
// delete Tour
exports.deleteTour = deleteOne(Tour);

// get tour stats
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          numTours: { $sum: 1 },
          numRating: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },

      {
        $sort: {
          avgPrice: 1,
        },
      },
      // {
      //   $match: { _id: { $ne: "EASY" } },
      // },
    ]);

    return res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!!");
  }
};

// get tour monthly plan
exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const plan = await Tour.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numToursStarts: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      {
        $addFields: {
          month: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numToursStarts: -1 },
      },

      {
        $limit: 12,
      },
    ]);

    return res.status(200).json({
      status: "success",
      data: {
        plan,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!!");
  }
};

// tours-within/:distance/center/:latlng/unit/:unit
// 33.996032, -118.415437
exports.getToursWithin = async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");
  if (!lat && !lng) {
    next(
      new ApiError(
        "Please provide Latitude and Longitude in the format lat,lng.",
        400
      )
    );
  }

  // trying to get the radian of the distance by dividing it by the Earth Radius
  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  const docs = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: "success",
    result: docs.length,
    data: {
      docs,
    },
  });
};

exports.getDistances = async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");
  const multiplier = unit === "mi" ? 0.000621371 : 0.001;
  if (!lat && !lng) {
    next(
      new ApiError(
        "Please provide Latitude and Longitude in the format lat,lng.",
        400
      )
    );
  }

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: "distance",
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      docs: distances,
    },
  });
};
