const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const csv = require("csvtojson");

const csvRoute = require("./routes/csvRoute");
const AppError = require("./utils/AppError");

const app = express();

// Global Middlewares

//development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
// app.use(express.json());

// app.post(
//   "/api/v1/upload",
//   upload.single("file"),
//   (err, req, res, next) => {
//     if (err) {
//       console.log(req);
//       console.log(req.file);
//       console.log(err);
//       return res.sendStatus(500);
//     }
//     next();
//   },
//   async (req, res, next) => {
//     const jsonArray = await csv({}).fromFile(testCSV);

//     console.log(jsonArray);
//   }
// );

app.use("/api/v1", csvRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

module.exports = app;
