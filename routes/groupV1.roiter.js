const { Router } = require("express");
const groupController = require("../controllers/group.controller");
const { singleUpload } = require("../middlewares/upload");

// const upload = multer({ dest: path.resolve(__dirname, '../public/images')});

const groupV1Router = Router();

groupV1Router
  .route("/")
  .post(singleUpload("Image"), groupController.createGroupV1);

groupV1Router
  .route("/:idGroup")
  .post(groupController.addUserToGroupV1)
  .patch(groupController.updateGroupV1)
  .delete(groupController.deleteGroupV1);

groupV1Router.route("/user/:idUser").get(groupController.getAllGroupsV1);

// groupV1Router.route("/:idGroup/image").patch(groupController.addImage);
groupV1Router.patch(
  "/:idGroup/image",
  singleUpload("Image"),
  groupController.addImage
);

module.exports = groupV1Router;
