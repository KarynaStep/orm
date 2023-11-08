const { Router } = require("express");
const MessageController = require("../controllers/message.controller");
const paginate = require("../middlewares/paginate.mw");
const { checkMessage } = require("../middlewares/messages.mw");

const messageRouter = Router();

messageRouter
  .route("/")
  .post(MessageController.createMessage)
  .get(paginate, MessageController.getAllMessages);

messageRouter
  .route("/:idMessage")
  .all(checkMessage)
  .get(MessageController.getMessage)
  .patch(MessageController.updateMessage)
  .delete(MessageController.deleteMessage);

module.exports = messageRouter;
