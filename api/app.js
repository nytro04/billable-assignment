const express = require("express");
const morgan = require("morgan");

const csvRoute = require("./routes/csvRoute");
const AppError = require("./utils/AppError");

const app = express();

// Global Middlewares

//development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json());

app.use("/api/v1/csv", csvRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

module.exports = app;
