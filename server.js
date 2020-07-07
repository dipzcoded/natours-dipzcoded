// 3rd party modules
const dotenv = require("dotenv");
// these module will read the variables defined on the file and save it to node enviromnent variables
dotenv.config({ path: "./config.env" });

// developers modules
const connectDB = require("./database/config");
const app = require("./app");
const Tour = require("./model/Tour");

// connection mongoDB with my express framework
connectDB();

// creating a port for our server
const port = 5000 || process.env.PORT;

// Starting up a server
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
