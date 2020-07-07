const express = require("express");
const morgan = require("morgan");
const app = express();
// setting up middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(
  express.json({
    extened: false,
  })
);
// setting up customized middleware
app.use((req, res, next) => {
  console.log("hello from the middleware dead ass");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// mouting routers
app.use("/api/v1/tours", require(`${__dirname}/route/api/tours`));
app.use("/api/v1/users", require(`${__dirname}/route/api/users`));

module.exports = app;
