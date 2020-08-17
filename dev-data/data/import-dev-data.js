// node modules
const fs = require("fs");
// 3rd party modules
const dotevn = require("dotenv");

// configuring our enviroment variables
dotevn.config({ path: "./config.env" });

// Developers modules
const connectDB = require("../../database/config");
const Tour = require("../../model/Tour");
const Review = require("../../model/Review");
const User = require("../../model/User");
// connection to MongoDB
connectDB();

// read json file
const tourData = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"))
  .tours;
const reviewData = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
).reviews;
const userData = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"))
  .users;

// import data into database
const importData = async () => {
  try {
    await Tour.create(tourData);
    await User.create(userData);
    await Review.create(reviewData);
    console.log("Data Successfully loaded");
  } catch (error) {
    console.error(error.message);
  }
  process.exit(1);
};

// Delete All Data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("Data Successfully deleted");
  } catch (error) {
    console.error(error.message);
  }
  process.exit(1);
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
