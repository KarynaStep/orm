const { where } = require("sequelize");
const { Task, User } = require("../models");

// module.exports.createTask = async (req, res, next) => {
//   try {
//     const {body, params: {idUser},} = req;
//     const newTask = await Task.create({ ...body, userId: idUser })
//     res.status(201).send({date: newTask})
//   } catch (error) {
//     next(error);
//   }
// }

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const newTask = await userInstance.createTask(body);
    res.status(201).send({ date: newTask });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const tasks = await userInstance.getTasks({
      where: {
        model: User,
        attributes: ["email"],
      },
    });
    if (tasks.length === 0) {
      return res.status(200).send({ date: "empty" });
    }
    res.status(200).send({ date: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const tasks = await userInstance.getTasks({
      where: {
        model: User,
        attributes: ["email"],
      },
    });
    if (tasks.length === 0) {
      return res.status(404).send({ date: "empty" });
    }
    res.status(200).send({ date: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.getTask = async (req, res, next) => {
  try {
    const { task } = req;
    const taskNew = await userInstance.getTask(task);

    res.status(200).send({ date: taskNew });
  } catch (error) {
    next(error);
  }
};
