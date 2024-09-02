const express = require('express');
const {userRouter} = require('./usersRouter.js');
const {groupRouter} = require('./groupRouter.js');
const {postRouter} = require('./postRouter.js');
const { notificationRouter } = require('./notificationRouter.js');
const { commentRouter } = require('./commentRouter.js');
const mainRouter = express.Router();
mainRouter.use(userRouter);
mainRouter.use(groupRouter);
mainRouter.use(postRouter);
mainRouter.use(notificationRouter);
mainRouter.use(commentRouter);
module.exports = { mainRouter };