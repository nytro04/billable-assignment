const multer = require("multer");

const upload = multer({ dest: "tmp/csv/" });

const uploadCSVFile =(  upload.single("file"), (req, res, next) )=> {

  next();
};

module.exports = uploadCSVFile;
