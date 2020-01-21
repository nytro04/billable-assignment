const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");

exports.getCSV = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      csvData
    }
  });
});
