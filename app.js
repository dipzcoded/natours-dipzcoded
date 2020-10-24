const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const ApiError = require("./utils/apiError");
const app = express();
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const ErrorHandlers = require("./middlewares/errorMiddlewares");
const compression = require('compression');
const path = require('path');


// setting up middleware

// // set Security HTTP Headers
// app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// // Limit Request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});

app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "10kb",
  })
);


app.use(compression())

// // Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// // Data sanitiation againt XSS
app.use(xss());

// // Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQuantity",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);



// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


// Routing routers
app.use("/api/v1/tours", require(`${__dirname}/route/api/tours`));
app.use("/api/v1/users", require(`${__dirname}/route/api/users`));
app.use("/api/v1/auth", require(`${__dirname}/route/api/auth.js`));
app.use("/api/v1/reviews", require(`${__dirname}/route/api/reviews`));
app.use("/api/v1/booking", require(`${__dirname}/route/api/bookings`));
app.use('/photo',express.static(path.join(__dirname, '/photo')))
// serve static assets in production
app.use(ErrorHandlers);



if(process.env.NODE_ENV == "production")
{
  // set static folder
  app.use(express.static('view/build'));
  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'view','build','index.html'))
  })
}



// app.all("*", (req, res, next) => {
//   next(new ApiError(`Route not found ${req.originalUrl}`, 404));
// });

module.exports = app;
