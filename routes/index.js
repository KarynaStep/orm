const { Router } = require("express");
const { checkUser } = require("../middlewares/users.mw");
const userRouter = require("./user.router");
const taskRouter = require("./task.router");
const messageRouter = require("./message.router");
const groupRouter = require("./group.router");

const router = Router();

router.use('/users', userRouter)

router.use('/users/:idUser/tasks', checkUser, taskRouter);

router.use("/users/:idUser/messages", checkUser, messageRouter);

router.use('/groups', groupRouter)



module.exports = router;
