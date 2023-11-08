const path = require('path')
const { Router } = require("express");
const multer = require("multer");

const groupController = require("../controllers/group.controller");
const { PATH_IMAGES } = require('../constsnts');
// const upload = multer({ dest: path.resolve(__dirname, '../public/images')});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, `..${PATH_IMAGES}`));
  },
  filename: function (req, file, cb) {
    const uniqueFillName = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname;
    cb(null, uniqueFillName);
  },
});
const upload = multer({ storage: storage });

const groupV1Router = Router();

groupV1Router.route("/").post(groupController.createGroupV1);

groupV1Router.route("/:idGroup").post(groupController.addUserToGroupV1);

groupV1Router.route("/user/:idUser").get(groupController.getAllGroupsV1);

// groupV1Router.route("/:idGroup/image").patch(groupController.addImage);
groupV1Router.patch("/:idGroup/image", upload.single('Image'), groupController.addImage);

module.exports = groupV1Router;
