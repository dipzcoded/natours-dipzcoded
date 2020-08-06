const jwt = require("jsonwebtoken");
const { check } = require("express-validator");
const User = require("../model/User");

exports.signUpValidation = [
  check("name", "name is required").not().isEmpty(),
  check("email", "email is required").isEmail(),
  check("password", "password must be 8 characters long").isLength({ min: 8 }),
  check("confirmPassword", "Confirm your password").exists(),
];

exports.comparePasswordandRoles = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ errors: [{ msg: "password didnt match" }] });
  } else if (
    req.body.password.length < 8 &&
    req.body.confirmPassword.length < 8
  ) {
    return res
      .status(400)
      .json({ errors: [{ msg: "password must be 8 characters long" }] });
  }

  if (req.body.role) {
    if (
      req.body.role !== "guide" &&
      req.body.role !== "lead-guide" &&
      req.body.role !== "admin"
    ) {
      return res.status(400).json({
        errors: [
          {
            msg:
              "please input a role as user or a guide or a leadguide or an admin",
          },
        ],
      });
    }
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
      return res.status(401).json({
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

exports.restrictRouting = (...roles) => {
  return (req, res, next) => {
    // roles ['admin','lead-guide']
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ msg: "You do not have permission to perform this action" });
    }

    next();
  };
};
