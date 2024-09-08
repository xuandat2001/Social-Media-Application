const express = require('express');
const { 
    getAllNotifications,
    getOneNotification,
    createFriendRequestNotification,
    createFriendAcceptedNotification,
    createFriendRejectedNotification,
    createJoinGroupRequestNotification,
    createJoinGroupAcceptedNotification,
    createJoinGroupRejectedNotification,
    createCommentNotification,
    createReactionNotification,
    createPostNotificationForFriends,
    createPostNotificationForGroup,
    createNewUserNotification,
    createGroupCreationNotification,
    createGroupEditedNotification,
    createGroupDeletedNotification,
    deleteNotification,
    markNotificationAsRead
} = require('../controllers/notificationController.js');  // Import all functions

const { checkSchema } = require('express-validator');
const { createNotificationValidationSchema } = require('../validation/validationSchema.js');
const { findNotificationById } = require('../middleware/findObject.js');

const notificationRouter = express.Router();

// Get all notifications for a user
notificationRouter.get('/api/notifications', getAllNotifications);

// Get a specific notification by ID
notificationRouter.get('/api/notifications/:id', findNotificationById, getOneNotification);

// Friend request notifications
notificationRouter.post('/api/notifications/friend-request', checkSchema(createNotificationValidationSchema), createFriendRequestNotification);
notificationRouter.post('/api/notifications/friend-accepted', checkSchema(createNotificationValidationSchema), createFriendAcceptedNotification);
notificationRouter.post('/api/notifications/friend-rejected', checkSchema(createNotificationValidationSchema), createFriendRejectedNotification);

// Join Group request notifications
notificationRouter.post('/api/notifications/group-request', checkSchema(createNotificationValidationSchema), createJoinGroupRequestNotification);
notificationRouter.post('/api/notifications/group-accepted', checkSchema(createNotificationValidationSchema), createJoinGroupAcceptedNotification);
notificationRouter.post('/api/notifications/group-rejected', checkSchema(createNotificationValidationSchema), createJoinGroupRejectedNotification);

// Post creation notifications
notificationRouter.post('/api/notifications/post-friends', checkSchema(createNotificationValidationSchema), createPostNotificationForFriends);
notificationRouter.post('/api/notifications/post-group', checkSchema(createNotificationValidationSchema), createPostNotificationForGroup);

// Comment and reaction notifications
notificationRouter.post('/api/notifications/comment', checkSchema(createNotificationValidationSchema), createCommentNotification);
notificationRouter.post('/api/notifications/reaction', checkSchema(createNotificationValidationSchema), createReactionNotification);

// New user notification
notificationRouter.post('/api/notifications/new-user', checkSchema(createNotificationValidationSchema), createNewUserNotification);

// Group-related notifications
notificationRouter.post('/api/notifications/group-created', checkSchema(createNotificationValidationSchema), createGroupCreationNotification);
notificationRouter.post('/api/notifications/group-edited', checkSchema(createNotificationValidationSchema), createGroupEditedNotification);
notificationRouter.post('/api/notifications/group-deleted', checkSchema(createNotificationValidationSchema), createGroupDeletedNotification);

// Delete a notification
notificationRouter.delete('/api/notifications/:id', findNotificationById, deleteNotification);

// Mark notification as read
notificationRouter.put('/api/notifications/:id/read', markNotificationAsRead);

module.exports = { notificationRouter };
