const { validationResult } = require("express-validator");
const Tour = require("../model/Tour");

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    // result: toursData.length,
    // data: {
    //   tours: toursData,
    // },
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: "success",
    // data: {
    //   tour: tourData,
    // },
  });
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here.....>",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    message: "delete successful",
    data: null,
  });
};
