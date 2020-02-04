// const fs = require("fs");

// const slugify = require("slugify");

// const multer = require("multer");
const csv = require("csvtojson");

const catchAsync = require("./../utils/catchAsync");
// const AppError = require("./../utils/AppError");

// const testCSV = "./testCSV.csv";

exports.uploadCSV = catchAsync(async (req, res, next) => {
  const jsonArray = await csv({ noheader: true }).fromFile(req.file.path);

  console.log(jsonArray);

  // const slugArray = jsonArray.map(report => {
  //   return Object.keys(report).map(item => {
  //     item.replace(" ", "-");
  //   });
  // });

  // console.log("file", testCSV);

  // const jsonObj = JSON.parse(jsonArray);
  // console.log(jsonObj);

  // const jsonContent = JSON.stringify(jsonArray);
  // console.log(jsonContent);

  // fs.writeFile("data.json", jsonContent, "utf8", err => {
  //   if (err) {
  //     console.log("An error occured while writing json object");
  //     return console.log(err);
  //   }

  //   console.log("Json file successfully written");
  // });

  res.status(200).json({
    status: "success",
    length: jsonArray.length,
    data: {
      csvData: jsonArray
    }
  });
});
