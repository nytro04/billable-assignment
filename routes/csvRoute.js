const express = require("express");
const multer = require("multer");

const { uploadCSV } = require("./../controllers/csvController");

// const uploadCSVFile = require("./../utils/fileUpload");

const upload = multer({ dest: "tmp/csv/" });

const router = express.Router();

// router.route("/upload").post(uploadCSV);
router.route("/upload").post(upload.single("file"), uploadCSV);
// router.route("/upload").post(uploadCSVFile, uploadCSV);

module.exports = router;
