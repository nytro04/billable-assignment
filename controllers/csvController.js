const csv = require("csvtojson");

const catchAsync = require("./../utils/catchAsync");

exports.uploadCSV = catchAsync(async (req, res, next) => {
  const jsonArray = await csv({ noheader: true }).fromFile(req.file.path);

  res.status(200).json({
    status: "success",
    length: jsonArray.length,
    data: {
      csvData: jsonArray
    }
  });
});
