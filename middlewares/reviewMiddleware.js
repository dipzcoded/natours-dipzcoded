exports.checkRating = (req, res, next) => {
  const { rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ errors: [{ msg: "The average rating is 1 to 5" }] });
  }

  next();
};

exports.checkUserAndTourIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};
