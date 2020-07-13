const { validationResult } = require("express-validator");
const Tour = require("../model/Tour");
const APIFeatures = require("../utils/apiFeatures");

exports.validateFields = (req, res, next) => {
  const { ratingsAverage, difficulty, priceDiscount, price } = req.body;
  const parseRatings = parseInt(ratingsAverage);
  const parseDiscount = parseInt(priceDiscount);
  const parsePrice = parseInt(price);

  if (parseRatings < 1 || parseRatings > 5) {
    return res
      .status(400)
      .json({ errors: [{ msg: "The average rating is 1 to 5" }] });
  } else if (
    difficulty !== "easy" &&
    difficulty !== "medium" &&
    difficulty !== "difficult"
  ) {
    return res.status(400).json({
      errors: [
        {
          msg: "The difficulty should only be either easy, medium or difficult",
        },
      ],
    });
  } else if (parseDiscount > parsePrice) {
    return res.status(400).json({
      errors: [
        {
          msg: `Discount price ${parseDiscount} must be less than ${price} `,
        },
      ],
    });
  }
  next();
};

exports.aliasTopTours = (req, res, next) => {
  (req.query.limit = "5"),
    (req.query.sort = "-ratingsAverage,price"),
    (req.query.fields = "name,price,ratingsAverage,summary,difficulty");

  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // Build Query

    // Execute query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sorting()
      .limitFields()
      .pagination();

    const toursData = await features.query;

    return res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      result: toursData.length,
      data: {
        toursData,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tourData = await Tour.findById(id);
    return res.status(200).json({
      status: "success",
      data: {
        tourData,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
};

exports.createTour = async (req, res) => {
  // validating my required fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // checking if a tour already exist with the name
    let newTour = await Tour.findOne({ name: req.body.name });

    if (newTour) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Tour already exists with the name" }] });
    }

    // saving a tour instance to the database
    newTour = await Tour.create(req.body);
    // newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updateTour = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id;

  try {
    const tourData = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        tourData,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
};

exports.deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    await Tour.findByIdAndDelete(id);

    return res.status(204).json({
      status: "success",
      message: "delete successful",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
};

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
