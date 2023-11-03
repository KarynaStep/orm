const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const TaskController = require("../controllers/task.controller"); 
const { checkUser } = require("../middlewares/users.mw");
const { checkTask } = require("../middlewares/tasks.mw");

const router = Router();

router.post("/users", UserController.createUser);
router.get("/users", UserController.getAllUsers);

router.patch("/users/:idUser", checkUser, UserController.updateUserInstance);
router.delete("/users/:idUser", checkUser, UserController.deleteUserInstance);

router.post("/users/:idUser/tasks", checkUser, TaskController.createTask);
router.get("/users/:idUser/tasks", checkUser, TaskController.getAllTasks);


router.get("/users/:idUser/tasks/:isTask", checkUser, checkTask, TaskController.getTask);
// router.patch("/users/:idUser/tasks", checkUser,checkTask, TaskController.updateTask);
// router.delete(
//   "/users/:idUser/tasks",
//   checkUser,
//   checkTask,
//   TaskController.deleteTask
// );

module.exports = router;
