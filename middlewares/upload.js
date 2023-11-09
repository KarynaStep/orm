const path = require("path");
const multer = require("multer");
const { PATH_IMAGES } = require("../constsnts");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, `..${PATH_IMAGES}`));
  },
  filename: function (req, file, cb) {
    const uniqueFillName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    cb(null, uniqueFillName);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "image/png") {
    cb(new Error('Wrong mimetype'))
  }

}
const upload = multer({ storage, fileFilter, limits:{fieldSize: 0.5} });

module.exports.singleUpload =(name) => upload.single(name)