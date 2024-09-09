const express = require('express');
const { 
    getAllNotifications,
    createFriendRequestNotification,
    createFriendAcceptedNotification,
    createFriendRejectedNotification,
    createJoinGroupRequestNotification,
    createJoinGroupAcceptedNotification,
    createJoinGroupRejectedNotification,
    createCommentNotification,
    createReactionNotification,
    createPostNotification,
    createNewUserNotification,
    createGroupCreationNotification,
    createGroupEditedNotification,
    createGroupDeletedNotification,
    deleteNotification,
    markNotificationAsRead
} = require('../controllers/notificationController.js');  // Import all functions

const {findNotificationById} = require('../middleware/findObject.js')


const notificationRouter = express.Router();

// Get all notifications for a user
notificationRouter.get('/api/notifications/:userId', getAllNotifications);

// Friend request notifications
notificationRouter.post('/api/notifications/friend-request', createFriendRequestNotification);
notificationRouter.post('/api/notifications/friend-accepted',  createFriendAcceptedNotification);
notificationRouter.post('/api/notifications/friend-rejected',  createFriendRejectedNotification);

// Join Group request notifications
notificationRouter.post('/api/notifications/group-request',  createJoinGroupRequestNotification);
notificationRouter.post('/api/notifications/group-accepted',  createJoinGroupAcceptedNotification);
notificationRouter.post('/api/notifications/group-rejected',  createJoinGroupRejectedNotification);

// Post creation notifications
notificationRouter.post('/api/notifications/post',  createPostNotification);

// Comment and reaction notifications
notificationRouter.post('/api/notifications/comment',  createCommentNotification);
notificationRouter.post('/api/notifications/reaction',  createReactionNotification);

// New user notification
notificationRouter.post('/api/notifications/new-user',  createNewUserNotification);

// Group-related notifications
notificationRouter.post('/api/notifications/group-created',  createGroupCreationNotification);
notificationRouter.post('/api/notifications/group-edited',  createGroupEditedNotification);
notificationRouter.post('/api/notifications/group-deleted',  createGroupDeletedNotification);

// Delete a notification
notificationRouter.delete('/api/notifications/:id', findNotificationById, deleteNotification);

// Mark notification as read
notificationRouter.put('/api/notifications/:id/read', markNotificationAsRead);

module.exports = { notificationRouter };
