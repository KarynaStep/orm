const { Router } = require("express");
const TaskController = require("../controllers/task.controller");
const { checkTask } = require("../middlewares/tasks.mw");
const paginate = require("../middlewares/paginate.mw");

const taskRouter = Router();

taskRouter
  .route("/")
  .post(TaskController.createTask)
  .get(paginate, TaskController.getAllTasks);

taskRouter
  .route("/:idTask")
  .all(checkTask)
  .get(TaskController.getTask)
  .patch(TaskController.updateTask)
  .delete(TaskController.deleteTask);

module.exports = taskRouter;
