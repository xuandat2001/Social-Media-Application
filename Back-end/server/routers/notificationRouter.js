const express = require('express');
const { 
    getAllNotifications,
    getOneNotification,
    createFriendRequestNotification,
    createFriendAcceptedNotification,
    createFriendRejectedNotification,
    createGroupRequestNotification,
    createGroupRejectedNotification,
    createCommentNotification,
    createReactionNotification,
    deleteNotification,
    markNotificationAsRead
} = require('../controllers/notificationController.js');

const { checkSchema } = require('express-validator');
const { createNotificationValidationSchema } = require('../validation/validationSchema.js');
const { findNotificationById } = require('../middleware/findObject.js');

const notificationRouter = express.Router();

// Routes for handling notifications

// Get all notifications for a user
notificationRouter.get('/api/notifications', getAllNotifications);

// Get a specific notification by ID
notificationRouter.get('/api/notifications/:id', findNotificationById, getOneNotification);

// Create a friend request notification
notificationRouter.post('/api/notifications/friend-request', checkSchema(createNotificationValidationSchema), createFriendRequestNotification);

// Create a friend accepted notification
notificationRouter.post('/api/notifications/friend-accepted', checkSchema(createNotificationValidationSchema), createFriendAcceptedNotification);

// Create a friend rejected notification
notificationRouter.post('/api/notifications/friend-rejected', checkSchema(createNotificationValidationSchema), createFriendRejectedNotification);

// Create a group request notification
notificationRouter.post('/api/notifications/group-request', checkSchema(createNotificationValidationSchema), createGroupRequestNotification);

// Create a group rejected notification
notificationRouter.post('/api/notifications/group-rejected', checkSchema(createNotificationValidationSchema), createGroupRejectedNotification);

// Create a comment notification
notificationRouter.post('/api/notifications/comment', checkSchema(createNotificationValidationSchema), createCommentNotification);

// Create a reaction notification
notificationRouter.post('/api/notifications/reaction', checkSchema(createNotificationValidationSchema), createReactionNotification);

// Delete a notification
notificationRouter.delete('/api/notifications/:id', findNotificationById, deleteNotification);

// Mark as read notification
notificationRouter.put('/api/notifications/:id/read', markNotificationAsRead);

module.exports = { notificationRouter };
