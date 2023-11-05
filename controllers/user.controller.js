const { User } = require("../models");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    if (!createdUser) {
      return res.status(400).send({data: 'Bad Request'})
    }
    createdUser.password = undefined;
    res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { pagination } = req
    
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "updatedAt"],
      },
      ...pagination,
    });
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const updatedUserInstance = await userInstance.update(body);
    updatedUserInstance.password = undefined;
    return res.status(200).send({ data: updatedUserInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const result = await userInstance.destroy();
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};

// module.exports.name = async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };
