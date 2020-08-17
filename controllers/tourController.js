const Tour = require("../model/Tour");

const {
  getOne,
  deleteOne,
  updateOne,
  createOne,
  getAllOne,
} = require("./factoryHandler");

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
