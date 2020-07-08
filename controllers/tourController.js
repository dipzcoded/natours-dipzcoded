const { validationResult } = require("express-validator");
const Tour = require("../model/Tour");

exports.getAllTours = async (req, res) => {
  try {
    const toursData = await Tour.find();

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
