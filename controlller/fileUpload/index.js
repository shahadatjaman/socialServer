var path = require("path");

const multer = require("multer");

const UPLAOD_DIR = __dirname + `../../../PUBLIC/IMG`;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, UPLAOD_DIR);
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    if (file) {
      req.fileName = fileName + fileExt;
    }
    req.fileName = fileName + fileExt;

    cb(null, fileName + fileExt);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
