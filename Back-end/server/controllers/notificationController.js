const notificationModel = require('../models/notificationModel.js');
const { validationResult } = require('express-validator');

// Common function to save a notification
const saveNotification = async (notificationData, res) => {
    try {
        const newNotification = new notificationModel(notificationData);
        const savedNotification = await newNotification.save();
        res.status(201).send(savedNotification);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while saving the notification.' });
    }
};

// Fetch all notifications for a user
const getAllNotifications = async (req, res) => {
    const { userId } = req.query; // Assuming notifications are filtered by userId
    if (!userId) return res.status(400).send({ error: 'userId is required' });

    try {
        const notifications = await notificationModel.find({ userId }).sort({ createdAt: -1 });
        res.send(notifications);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while retrieving notifications.' });
    }
};

// Fetch a single notification by ID
const getOneNotification = async (req, res) => {
    const { findNotification } = req;
    if (!findNotification) return res.status(404).send({ error: 'Notification not found' });
    res.send(findNotification);
};

// Create a friend request notification
const createFriendRequestNotification = async (req, res) => {
    const { userId, targetUserId } = req.body;
    await saveNotification({
        notiType: 'friendRequest',
        userId: targetUserId,
        targetUserId: userId,
    }, res);
};

// Create a friend acceptance notification
const createFriendAcceptedNotification = async (req, res) => {
    const { userId, targetUserId } = req.body;
    await saveNotification({
        notiType: 'friendAccepted',
        userId: targetUserId,
        targetUserId: userId,
    }, res);
};

// Create a friend rejection notification
const createFriendRejectedNotification = async (req, res) => {
    const { userId, targetUserId } = req.body;
    await saveNotification({
        notiType: 'friendRejected',
        userId: targetUserId,
        targetUserId: userId,
    }, res);
};

// Create a group request notification
const createGroupRequestNotification = async (req, res) => {
    const { userId, groupId } = req.body;
    await saveNotification({
        notiType: 'groupRequest',
        userId: userId,
        groupId: groupId,
    }, res);
};

// Create a group rejection notification
const createGroupRejectedNotification = async (req, res) => {
    const { userId, groupId } = req.body;
    await saveNotification({
        notiType: 'groupRejected',
        userId: userId,
        groupId: groupId,
    }, res);
};

// Create a comment notification
const createCommentNotification = async (req, res) => {
    const { userId, postId } = req.body;
    await saveNotification({
        notiType: 'comment',
        userId: userId,
        targetUserId: req.user.id, // The user who commented
        postId: postId,
    }, res);
};

// Create a reaction notification
const createReactionNotification = async (req, res) => {
    const { userId, postId } = req.body;
    await saveNotification({
        notiType: 'reaction',
        userId: userId,
        targetUserId: req.user.id, // The user who reacted
        postId: postId,
    }, res);
};

// Delete a notification
const deleteNotification = async (req, res) => {
    const { findNotification } = req;
    await findNotification.deleteOne();
    return res.sendStatus(200);
};
const markNotificationAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });

        if (!notification) {
            return res.status(404).send({ error: 'Notification not found' });
        }

        res.send(notification);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while marking the notification as read.' });
    }
};


module.exports = {
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
};
