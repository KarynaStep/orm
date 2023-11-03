const { User } = require("../models");

module.exports.checkUser = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const userInstance = await User.findByPk(idUser);
    if (!userInstance) {
      return res.status(404).send({ data: "user not exists" });
    }
    req.userInstance = userInstance;
    next();
  } catch (error) {
    next(error);
  }
};
