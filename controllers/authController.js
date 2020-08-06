const crypto = require("crypto");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const sendEmail = require("../utils/email");

const initJwtToken = (userid, res) => {
  const payload = {
    user: {
      id: userid,
    },
  };

  // Creating a token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Setting up cookies
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // creating cookie
  res.cookie("jwt", token, cookieOptions);

  res.json({ token });
};

exports.getLoginUser = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.json(user);
};

exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, photo, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exist!" }] });
    }

    user = new User({
      name,
      email,
      password,
    });

    if (photo) {
      user.photo = photo;
    }

    if (role) {
      user.role = role;
    }

    // encrypting the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // saving the user
    await user.save();

    // signing a user
    initJwtToken(user._id, res);
  } catch (error) {
    if (error.name === "MongoError") {
      return res.status(400).json({ errors: [{ msg: "User already exist!" }] });
    }
    res.status(500).send("Server Error!");
  }
};

exports.logIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    // check if user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ error: [{ msg: "Invalid credentials!" }] });
    }

    // check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: [{ msg: "Invalid credentials!" }] });
    }

    // signing a token
    initJwtToken(user._id, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
};

// forgot password
exports.forgotPassword = async (req, res) => {
  let user;
  try {
    // Get user based on posted email
    user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "There is no user with email address" });
    }
    // Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // set it to user's email
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}./nIf you didnt forget your password please kindly ignore this email!`;

    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "sucess",
      message: "Token sent to email!",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
};

// reset password
exports.resetPassword = async (req, res) => {
  try {
    // 1. get user based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2. if token as not expired, and there is a user, set the new password

    if (!user) {
      return res.status(400).json({ msg: "Token is invalid or has expired" });
    }

    // encrypting the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // 3. update changedPasswordAT property for the user
    await user.save();
    // 4. log in user and send jwt
    initJwtToken(user._id, res);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!");
  }
};

exports.updatePassword = async (req, res) => {
  try {
    // 1. get user from collection
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "user not found!" }] });
    }

    //2.  check if the posted password is correct
    const isMatch = await bcrypt.compare(
      req.body.passwordCurrent,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        errors: [{ msg: "your current password is wrong." }],
      });
    }

    // 3. if so, update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);

    await user.save();

    //4. log user in, send jwt
    initJwtToken(user._id, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
};
