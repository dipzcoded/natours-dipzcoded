const jwt = require("jsonwebtoken");
const { check } = require("express-validator");
const User = require("../model/User");

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

exports.authRouting = async (req, res, next) => {
  // getting the token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ msg: "Authorization is invalid!" });
  }
  try {
    // verifying token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // check if user still exists
    const freshUser = await User.findById(decoded.user.id);
    if (!freshUser) {
      return res
        .status(401)
        .json({ msg: "The user belonging to the token no longer exists. " });
    }

    // check if the user changed his/her password
    if (freshUser.changePasswordAfter(decoded.iat)) {
      return res
        .status(401)
        .json({
          msg: "you recently changed your password! please log in again!",
        });
    }

    //  Grant user access to protected route
    req.user = freshUser;

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ msg: "Authorization is invalid!" });
    }
    res.status(500).send("Server Error!");
  }
};
