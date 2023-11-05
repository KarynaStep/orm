const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const TaskController = require("../controllers/task.controller"); 
const MessageController = require("../controllers/message.controller"); 
const { checkUser } = require("../middlewares/users.mw");
const { checkTask } = require("../middlewares/tasks.mw");
const { checkMessage } = require("../middlewares/messages.mw");
const paginate = require("../middlewares/paginate.mw")

const router = Router();

router.post("/users", UserController.createUser);
router.get("/users",paginate,  UserController.getAllUsers);
router.patch("/users/:idUser", checkUser, UserController.updateUserInstance);
router.delete("/users/:idUser", checkUser, UserController.deleteUserInstance);

router.post("/users/:idUser/tasks", checkUser, TaskController.createTask);
router.get("/users/:idUser/tasks",paginate, checkUser, TaskController.getAllTasks);
router.get("/users/:idUser/tasks/:idTask", checkUser, checkTask, TaskController.getTask);
router.patch(
  "/users/:idUser/tasks/:idTask",
  checkUser,
  checkTask,
  TaskController.updateTask
);
router.delete(
  "/users/:idUser/tasks/:idTask",
  checkUser,
  checkTask,
  TaskController.deleteTask
);

router.post(
  "/users/:idUser/messages",
  checkUser,
  MessageController.createMessage
);
router.get(
  "/users/:idUser/messages",
  paginate,
  checkUser,
  MessageController.getAllMessages
);
router.get(
  "/users/:idUser/messages/:idMessage",
  checkUser, checkMessage, MessageController.getMessage
);
router.patch(
  "/users/:idUser/messages/:idMessage",
  checkUser,
  checkMessage,
  MessageController.updateMessage
);
router.delete(
  "/users/:idUser/messages/:idMessage",
  checkUser,
  checkMessage,
  MessageController.deleteMessage
);

module.exports = router;
