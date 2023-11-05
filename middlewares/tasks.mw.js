const { Task } = require("../models");

module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { idTask },
    } = req;
    const [task] = await userInstance.getTasks({
      where: {
        id: idTask
      }
    });
    if (!task) {
      return res.status(404).send({data: 'task not found'})
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