const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const { checkUser } = require("../middlewares/users.mw");
const paginate = require("../middlewares/paginate.mw")

const userRouter = Router();

userRouter
  .route('/')
.post(UserController.createUser)
.get(paginate, UserController.getAllUsers);

userRouter
  .route('/:idUser').all(checkUser)
.patch(UserController.updateUserInstance)
.delete(UserController.deleteUserInstance);

module.exports = userRouter;