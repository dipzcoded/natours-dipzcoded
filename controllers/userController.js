const User = require("../model/User");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route not yet defined",
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route not yet defined",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route not yet defined",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route not yet defined",
  });
};

exports.updateMe = async (req, res) => {
  // 1) create error if user Post password data
  if (req.body.password || req.body.passwordConfirm) {
    return res
      .status(400)
      .json({ msg: "This route is not for password update." });
  }

  try {
    const user = await User.findById(req.user.id);

    // filtered out unwanted fields
    const filterBody = filterObj(req.body, "name", "email");

    //2) update the user document
    if (filterBody.name) {
      user.name = filterBody.name;
    }

    if (filterBody.email) {
      user.email = filterBody.email;
    }

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
};

exports.deleteMe = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
};
