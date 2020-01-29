// const fs = require("fs");

// const multer = require("multer");
const csv = require("csvtojson");

const catchAsync = require("./../utils/catchAsync");
// const AppError = require("./../utils/AppError");

// const testCSV = "./testCSV.csv";

exports.uploadCSV = catchAsync(async (req, res, next) => {
  const jsonArray = await csv({}).fromFile(req.file.path);

  // console.log("file", testCSV);

  console.log(jsonArray);

  res.status(200).json({
    status: "success",
    length: jsonArray.length,
    data: {
      csvData: jsonArray
    }
  });
});
