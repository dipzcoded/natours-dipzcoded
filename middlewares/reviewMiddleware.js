exports.checkRating = (req, res, next) => {
  const { rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ errors: [{ msg: "The average rating is 1 to 5" }] });
  }

  next();
};
