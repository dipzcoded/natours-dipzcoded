const User = require("../model/User");
const { deleteOne, updateOne, getOne, getAllOne } = require("./factoryHandler");
const multer = require('multer');
const AppError = require('../utils/apiError');
const sharp = require('sharp');
const fs = require('fs');

// multer storage
// const multerStorage = multer.diskStorage( {
//   destination : (rq, file, cb) => {
//     cb(null,"view/public/img/users");
//   },
//   filename : (req, file, cb) => {
//     // user-88868868688686-currenttimestamp.jpeg
//     const fileExt = file.mimetype.split('/')[1];
//     cb(null,`user-${req.user.id}-${Date.now()}.${fileExt}`);
//   }
// });





// image stored as a buffered in memory
const multerStorage = multer.memoryStorage();

// multer filter
const multerFilter = (req, file, cb) => {

  if(file.mimetype.startsWith('image')){
    cb(null,true)
  }else
  {
    cb(new AppError("Not an image!, Please Upload only images.",400), false)
  }

}

// path to save the images
const upload = multer({
  storage : multerStorage,
  fileFilter : multerFilter
});



// uploading images middleware
exports.uploadUserPhoto = upload.single('photo');

// resizing images middleware
exports.resizeUserPhoto = async (req,res, next) => {

    if(!req.file) return next();
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
   try {
    await sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({quality : 90}).toFile(`photo/${req.file.filename}`);
    next();
   } catch (error) {
    //  console.log(error.message);
     res.status(500).send("Server Error!");
   }
     
}


const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = getAllOne(User);

exports.getUser = getOne(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route will not be defined/ so please use the signup instead",
  });
};

// you cant update your password with in this route
exports.updateUser = updateOne(User);

exports.deleteUser = deleteOne(User);

exports.updateMe = async (req, res) => {

  // console.log(req.file)

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

    if(req.file) 
    {
      user.photo = req.file.filename;
    }

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
    // console.error(error.message);
    res.status(500).send("Server Error!");
  }
};

exports.deleteMe = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { $set: { active: false } });

    res.status(204).json({ msg: "User deleted" });
  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Server Error!");
  }
};
