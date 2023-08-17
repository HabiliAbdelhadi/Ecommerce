const multer = require("multer");
const path = require("path");

// Set the Storage Engine
const storage = multer.diskStorage({
  destination: "./public",
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.parse(file.originalname).ext
    );
  },
});

// Check File Type
function checkImage(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.parse(file.originalname).ext);
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: type du fichier invalide !");
  }
}

exports.uploadMulti = multer({
  storage: storage,
  // limits:1024,
  fileFilter: function (req, file, cb) {
    checkImage(file, cb);
  },
}).array("files", 10);
