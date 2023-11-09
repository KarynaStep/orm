const { Router } = require("express");
const groupController = require("../controllers/group.controller");
const { singleUpload } = require("../middlewares/upload");

const groupRouter = Router();

groupRouter
  .route("/")
  .post(singleUpload("Image"), groupController.createGroup);

groupRouter
  .route("/:idGroup")
  .post(groupController.addUserToGroup)
  .patch(groupController.updateGroup)
  .delete(groupController.deleteGroup);

groupRouter.route("/user/:idUser").get(groupController.getAllGroups);

groupRouter.patch(
  "/:idGroup/image",
  singleUpload("Image"),
  groupController.addImage
);

module.exports = groupRouter;
