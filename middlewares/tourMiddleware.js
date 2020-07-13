const { check } = require("express-validator");

exports.checkValidators = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("A tour must have a name")
    .isLength({ min: 10 })
    .withMessage("A tour name must be more or equal to 10 characters")
    .isLength({ max: 40 })
    .withMessage("A tour name must be less or equal to 40 characters"),
  check("price", "A tour must have a price").exists(),
  check("duration", "A tour must have a duration").exists(),
  check("maxGroupSize", "A tour must have a max group size").exists(),
  check("summary", "A tour must have a description").not().isEmpty(),
  check("imageCover", "A tour must have a image cover").not().isEmpty(),
];

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
