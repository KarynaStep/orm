const { Router } = require("express");
const { checkUser } = require("../middlewares/users.mw");
const userRouter = require("./user.router");
const taskRouter = require("./task.router");
const messageRouter = require("./message.router");
const groupV1Router = require("./groupV1.roiter");
const groupV2Router = require("./groupV2.roiter");

const router = Router();

router.use('/users', userRouter)

router.use('/users/:idUser/tasks', checkUser, taskRouter);

router.use("/users/:idUser/messages", checkUser, messageRouter);

router.use('/groups', groupV1Router)

router.use("/users/:idUser/groups",checkUser, groupV2Router);



module.exports = router;
