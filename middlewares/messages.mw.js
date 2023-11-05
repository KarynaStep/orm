const { Message } = require("../models");

module.exports.checkMessage = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { idMessage },
    } = req;
    const [message] = await userInstance.getMessages({
      where: {
        id: idMessage
      },
    });
    if (!message) {
      return res.status(404).send({ data: "task not found" })
    }
    req.messageInstance = message
    next()
  } catch (error) {
    next(error);
  }
};
