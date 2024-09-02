const express = require('express');
const { getAllNotifications,getOneNotification,createNewNotification,editNotification,deleteNotification } = require('../controllers/notificationController.js');
const { checkSchema } = require('express-validator');
const { createNotificationValidationSchema } = require('../validation/validationSchema.js');
const { findNotificationById } = require('../middleware/findObject.js');
const notificationRouter = express.Router();

notificationRouter.get('/api/notifications', getAllNotifications);
notificationRouter.get('/api/notifications/:id', findNotificationById, getOneNotification);
notificationRouter.post('/api/notifications', checkSchema(createNotificationValidationSchema), createNewNotification);
notificationRouter.put('/api/notifications/:id', findNotificationById, editNotification);
notificationRouter.delete('/api/notifications/:id', findNotificationById, deleteNotification);

module.exports = { notificationRouter };