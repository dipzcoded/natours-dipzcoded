const { validationResult } = require("express-validator");
const APIFeatures = require("../utils/apiFeatures");
const ApiError = require("../utils/apiError");

exports.getAllOne = (Model, type) => {
  return async (req, res, next) => {
    try {
      let filter = {};
      if (req.params.tourId) filter = { tour: req.params.tourId };

      // Execute query
      const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sorting()
        .limitFields()
        .pagination();

      if (req.query.page) {
        const skipVal = (req.query.page - 1) * req.query.limit * 1;

        let countTot;
        let secretTourNo;

        countTot = await Model.countDocuments();

        if (type === "Tour") {
          secretTourNo = Model.find({ secretTour: { $eq: true } });
          // console.log(secretTourNo.length);
          if (secretTourNo.length > 0 && secretTourNo !== undefined) {
            countTot = countTot - secretTourNo.length;
          }
        }

        if (skipVal >= countTot) {
          next(new ApiError("page not found", 404));
        }
      }

      // const doc = await features.query.explain();
      const doc = await features.query;

      return res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        result: doc.length,
        data: {
          doc,
        },
      });
    } catch (error) {
      // console.error(error.message);
      res.status(500).send("Server Error");
    }
  };
};

exports.getOne = (Model, popOptions) => {
  return async (req, res, next) => {
    const id = req.params.id;

    try {
      let query = Model.findById(id);
      if (popOptions) {
        query = query.populate(popOptions);
      }

      const doc = await query;

      if (!doc) {
      return  next(new ApiError("no document found with that ID", 404));
      }

      return res.status(200).json({
        status: "success",
        data: {
          doc,
        },
      });
    } catch (error) {
      // console.error(error.message);
      // console.log(error.kind)

      if (error.kind === "ObjectId") {
      return next(new ApiError("Invalid tour id", 404));
      }

      res.status(500).send("Server Error!");
    }
  };
};

exports.deleteOne = (Model) => {
  return async (req, res, next) => {
    const id = req.params.id;

    try {
      let doc = await Model.findById(id);
      if (!doc) {
        next(new ApiError("no document found with that ID", 404));
      }

      await Model.findByIdAndDelete(id);

      return res.status(204).json({
        status: "success",
        message: "delete successful",
      });
    } catch (error) {
      // console.error(error.message);

      if (error.kind === "ObjectId") {
        next(new ApiError("Invalid tour id", 404));
      }

      res.status(500).send("Server Error!");
    }
  };
};

exports.updateOne = (Model) => {
  return async (req, res, next) => {
    const id = req.params.id;

    try {
      let doc = await Model.findById(id);

      if (!doc) {
        next(new ApiError("no document found with that ID", 404));
      }

      doc = await Model.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json({
        status: "success",
        data: {
          doc,
        },
      });
    } catch (error) {
      // console.error(error.message);

      if (error.kind === "ObjectId") {
        next(new ApiError("Invalid tour id", 404));
      }

      res.status(500).send("Server Error!");
    }
  };
};

exports.createOne = (Model) => {
  return async (req, res, next) => {
    // validating my required fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // saving a document instance to the database
      let doc = await Model.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          doc,
        },
      });
    } catch (error) {
      // console.error(error.message);

      if (
        error.message.includes(
          "E11000 duplicate key error collection: natours.tours index: name_1 dup key"
        )
      ) {
        next(new ApiError("tour already been created", 400));
      }

      if (
        error.message ===
        "E11000 duplicate key error collection: natours.reviews index: tour_1_user_1 dup key: { tour: ObjectId('5f38a78a1f68e51ae031bc99'), user: ObjectId('5c8a1dfa2f8fb814b56fa181') }"
      ) {
        next(new ApiError("review already been created", 400));
      }

      if (error.name === "MongoError") {
        next(new ApiError("Document exists", 400));
      }

      res.status(500).send("Server Error");
    }
  };
};
