const { validationResult } = require("express-validator");
const Tour = require("../model/Tour");
const APIFeatures = require("../utils/apiFeatures");
const User = require("../model/User");
exports.getAllTours = async (req, res) => {
  try {
    // Execute query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sorting()
      .limitFields()
      .pagination();

    if (req.query.page) {
      const skipVal = (req.query.page - 1) * req.query.limit * 1;
      const countTot = await Tour.countDocuments();
      console.log(countTot);
      console.log(skipVal);
      if (skipVal >= countTot - 1) {
        return res.status(404).json({ errors: [{ msg: "Page not found" }] });
      }
    }

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
    const tourData = await Tour.findById(id).populate("reviews");

    if (!tourData) {
      return res.status(404).json({ msg: "Tour not found with that ID" });
    }

    return res.status(200).json({
      status: "success",
      data: {
        tourData,
      },
    });
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Invalid tour id" });
    }

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
  const id = req.params.id;

  try {
    let tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({ msg: "Tour not found with that ID" });
    }

    tour = await Tour.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    res.status(200).json({
      status: "success",
      data: {
        tourData: tour,
      },
    });
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Invalid tour id" });
    }

    res.status(500).send("Server Error!");
  }
};

exports.deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    let tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ msg: "Tour not found with that ID" });
    }

    await Tour.findByIdAndDelete(id);

    return res.status(204).json({
      status: "success",
      message: "delete successful",
    });
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Invalid tour id" });
    }

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
