const { Message, User } = require("../models");

module.exports.createMessage = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const newMessage = await userInstance.createMessage(body);
    res.status(201).send({ date: newMessage });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { userInstance, pagination } = req;
    const messages = await userInstance.getMessages({
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
      ...pagination,
    });
    if (messages.length === 0) {
      return res.status(200).send({ date: "empty" });
    }
    res.status(200).send({ date: messages });
  } catch (error) {
    next(error);
  }
};

module.exports.getMessage = async (req, res, next) => {
  try {
    const { messageInstance } = req;
    res.status(200).send({ date: messageInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.updateMessage = async (req, res, next) => {
  try {
    const { messageInstance, body } = req;
    const updateMessage = await messageInstance.update(body, {
      returning: true,
    });
    res.status(200).send({ date: updateMessage });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  try {
    const { messageInstance } = req;
    await messageInstance.destroy();
    res.status(200).send({ date: messageInstance });
  } catch (error) {
    next(error);
  }
};