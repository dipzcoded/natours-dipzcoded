const { validationResult } = require("express-validator");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllOne = (Model, type) => {
  return async (req, res) => {
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
          console.log(secretTourNo.length);
          if (secretTourNo.length > 0 && secretTourNo !== undefined) {
            countTot = countTot - secretTourNo.length;
          }
        }

        if (skipVal >= countTot) {
          return res.status(404).json({ errors: [{ msg: "Page not found" }] });
        }
      }

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
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  };
};

exports.getOne = (Model, popOptions) => {
  return async (req, res) => {
    const id = req.params.id;

    try {
      let query = await Model.findById(id);
      if (popOptions) {
        query = query.populate(popOptions);
      }

      const doc = await query;

      if (!doc) {
        return res.status(404).json({ msg: "no document found with that ID" });
      }

      return res.status(200).json({
        status: "success",
        data: {
          doc,
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
};

exports.deleteOne = (Model) => {
  return async (req, res) => {
    const id = req.params.id;

    try {
      let doc = await Model.findById(id);
      if (!doc) {
        return res.status(404).json({ msg: "no document found with that ID" });
      }

      await Model.findByIdAndDelete(id);

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
};

exports.updateOne = (Model) => {
  return async (req, res) => {
    const id = req.params.id;

    try {
      let doc = await Model.findById(id);

      if (!doc) {
        return res.status(404).json({ msg: "no document found with that ID" });
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
      console.error(error.message);

      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "Invalid tour id" });
      }

      res.status(500).send("Server Error!");
    }
  };
};

exports.createOne = (Model) => {
  return async (req, res) => {
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
      console.error(error);

      if (error.name === "MongoError") {
        return res
          .status(400)
          .json({ errors: [{ msg: "Tour already exists with the name" }] });
      }

      res.status(500).send("Server Error");
    }
  };
};
