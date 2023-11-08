const { Router } = require("express");
const groupController = require("../controllers/group.controller");

const groupV2Router = Router();

groupV2Router
  .route("/")
  .post(groupController.createGroupV2)
  .get(groupController.getAllGroupV2);

  groupV2Router.route("/:idGroup").post(groupController.addUserToGroupV2)

module.exports = groupV2Router;