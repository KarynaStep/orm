const _ = require("lodash");
const createError = require("http-errors");
const { Group, User } = require("../models");
const attrsV1 = ["name", "imagePath", "decription", "userId"];

module.exports.addImage = async (req, res, next) => {
  try {
    // console.log(req);
    console.log(req.file.filename);
    const {
      file: { filename },
      params: { idGroup },
    } = req;
    // const upload = multer({
    //   storage, 
    //   fileFilter,
    //   limits: {
        
    //   }
    // })
    const [count, [updateGroup]] = await Group.update(
      { imagePath: filename },
      {
        where: {
          id: idGroup,
        },
        returning: true,
      }
    );

    res.send(updateGroup);
  } catch (error) {
    next(error);
  }
};

module.exports.updateGroup = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
      body,
    } = req;
    let values = _.pick(body, attrsV1);
    const [count, [updateGroup]] = await Group.update(
      { ...values },
      {
        where: {
          id: idGroup,
        },
        returning: true,
      }
    );
    res.send(updateGroup);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteGroup = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
    } = req;

    const group = await Group.findByPk(idGroup);
    if (!group) {
      return next(createError(404, "Group not found"));
    }
    await group.destroy();

    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.createGroup = async (req, res, next) => {
  try {
    const { body, file } = req;
    let values = _.pick(body, attrsV1);
    if (file) {
      values = { ...values, imagePath: file.filename };
    }
    const user = await User.findByPk(values.userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const group = await Group.create(values);
    if (!group) {
      return next(createError(404, "Bad request"));
    }
    await user.addGroup(group);
    res.status(201).send({ data: group });
    // await group.addUser(user);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllGroups = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;

    const userWithGroups = await User.findByPk(idUser, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Group,
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!userWithGroups) {
      return res.status(404).send({ data: "User not found" });
    }
    res.status(200).send({ data: userWithGroups });
  } catch (error) {
    next(error);
  }
};

module.exports.addUserToGroup = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
      body: { userId },
    } = req;
    const user = await User.findByPk(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const group = await Group.findByPk(idGroup);
    if (!group) {
      return next(createError(404, "Group not found"));
    }
    await group.addUser(user);
    const groupWithUsers = await Group.findByPk(idGroup, {
      include: [
        {
          model: User,
          attributes: ["id", "email"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.status(201).send({ data: groupWithUsers });
  } catch (error) {}
};
