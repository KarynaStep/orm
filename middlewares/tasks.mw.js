
const NotFoundError = require("../errors/NotFoundError");
const { Task } = require("../models");

module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { idTask },
    } = req;
    const [task] = await userInstance.getTasks({
      where: {
        id: idTask,
      },
    });
    if (!task) {
      return next(new NotFoundError('Tasks not found'));
    }
    req.taskInstance = task;
    next();
  } catch (error) {
    next(error);
  }
};

// ({
//       where: { id: idTask },
//     },)
