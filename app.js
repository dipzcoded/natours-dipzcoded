const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const ErrorHandlers = require("./middlewares/errorMiddlewares");
const ApiError = require("./utils/apiError");
const app = express();

// setting up middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use(
  express.json({
    extened: false,
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// mouting routers
app.use("/api/v1/tours", require(`${__dirname}/route/api/tours`));
app.use("/api/v1/users", require(`${__dirname}/route/api/users`));
app.use("/api/v1/auth", require(`${__dirname}/route/api/auth.js`));

app.all("*", (req, res, next) => {
  next(new ApiError(`Route not found ${req.originalUrl}`, 404));
});

app.use(ErrorHandlers);

module.exports = app;
