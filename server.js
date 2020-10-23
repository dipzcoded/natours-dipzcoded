// 3rd party modules
const dotenv = require("dotenv");
// these module will read the variables defined on the file and save it to node enviromnent variables
dotenv.config({ path: "./config.env" });

// developers modules

const app = require("./app");



// creating a port for our server
const port = process.env.PORT || 5000;

// Starting up a server
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
