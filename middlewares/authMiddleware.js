const { check } = require("express-validator");
exports.signUpValidation = [
  check("name", "name is required").not().isEmpty(),
  check("email", "email is required").isEmail(),
  check("password", "password must be 8 characters long").isLength({ min: 8 }),
  check("confirmPassword", "Confirm your password").exists(),
];

exports.comparePassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ errors: [{ msg: "password didnt match" }] });
  }

  next();
};

exports.loginValidation = [
  check("email").isEmail().withMessage("Enter a valid email address"),
  check("password", "Enter a password").exists(),
];
