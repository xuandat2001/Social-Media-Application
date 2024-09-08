const notificationModel = require('../models/notificationModel.js');
const { validationResult } = require('express-validator');
const Post = require('../models/postModel');  // Adjust the path to your actual model location
const Group = require('../models/groupModel');  // Adjust the path to your actual model location
const User = require('../models/userModel');
const friednshipModel  = require('../models/friendshipModel.js')
// Common function to save a notification
const saveNotification = async (notificationData, res) => {
    try {
        const newNotification = new notificationModel(notificationData);
        const savedNotification = await newNotification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving the notification.' });
    }
};


// Fetch all notifications for a user
const getAllNotifications = async (req, res) => {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    try {
      const notifications = await notificationModel.find({ received_by: userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
  
      const total = await notificationModel.countDocuments({ received_by: userId });
  
      res.status(200).json({
        notifications,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  };
// Fetch a single notification by ID
const getOneNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await notificationModel.findById(id);
        if (!notification) return res.status(404).json({ error: 'Notification not found' });
        res.json(notification);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the notification.' });
    }
};

// Create a friend request notification
const createFriendRequestNotification = async (req, res) => {
    const { senderId, receiverId } = req.body;
    const result = await sendFriendRequest(senderId, receiverId);
    return res.status(200).send(result);
}
// Create a friend request notification
const sendFriendRequest = async (senderId, receiverId) => {
    try {
        // Check if the friendship already exists
        const existingFriendship = await friednshipModel.findOne({
            $or: [
                { user1_id: senderId, user2_id: receiverId },
                { user1_id: receiverId, user2_id: senderId },
            ],
        });

        if (existingFriendship) {
            return { msg: 'Friend request already sent or accepted.' };
        }

        // Create a new friendship request
        const newFriendship = new friednshipModel({
            user1_id: senderId,
            user2_id: receiverId,
            status: 'pending',
        });
        await newFriendship.save();

        // Create a notification for the receiver
        const newNotification = new notificationModel({
            receiver_id: receiverId,
            sender_id: senderId,
            type: 'friend-request',
        });
        await newNotification.save();

        return { msg: 'Friend request sent successfully' };
    } catch (error) {
        console.error('Error sending friend request:', error);
        return { msg: 'Internal Server Error' };
    }
};    
    // Create a friend acceptance notification
const createFriendAcceptedNotification = async (req, res) => {
    const { triggered_by, received_by } = req.body;
    await saveNotification({
        notification_type: 'friendRequestAccepted',
        triggered_by, // The one accepting the request
        received_by, // The one who sent the request
    }, res);
};

// Create a friend rejection notification
const createFriendRejectedNotification = async (req, res) => {
    const { triggered_by, received_by } = req.body;
    await saveNotification({
        notification_type: 'friendRequestRejected',
        triggered_by, // The one rejecting the request
        received_by, // The one who sent the request
    }, res);
};

// Create a group creation notification (when a group is successfully created)
const createGroupCreationNotification = async (req, res) => {
    const { triggered_by, received_by, group_id } = req.body;
    await saveNotification({
        notification_type: 'groupCreated',
        triggered_by,  // Admin who created the group
        received_by,   // User who requested the group creation
        group_id,
    }, res);
};

// Create a group edited notification (when a group is edited)
const createGroupEditedNotification = async (req, res) => {
    const { triggered_by, received_by, group_id } = req.body;
    await saveNotification({
        notification_type: 'groupEdited',
        triggered_by,  // Admin who edited the group
        received_by,   // Group members who are being notified
        group_id,
    }, res);
};

// Create a group deleted notification (when a group is deleted)
const createGroupDeletedNotification = async (req, res) => {
    const { triggered_by, received_by, group_id } = req.body;
    await saveNotification({
        notification_type: 'groupDeleted',
        triggered_by,  // Admin who deleted the group
        received_by,   // Group members who are being notified
        group_id,
    }, res);
};
// Create a group request notification
const createJoinGroupRequestNotification = async (req, res) => {
    const { triggered_by, group_id } = req.body;
    await saveNotification({
        notification_type: 'groupRequest',
        triggered_by,
        received_by: req.adminId, // The admin will receive the request
        group_id,
    }, res);
};

// Create a group join acceptance notification
const createJoinGroupAcceptedNotification = async (req, res) => {
    const { triggered_by, group_id } = req.body;
    await saveNotification({
        notification_type: 'groupRequestAccepted',
        triggered_by: req.adminId, // The admin who accepted the request
        received_by: triggered_by, // The user who sent the request
        group_id,
    }, res);
};

// Create a group rejection notification
const createJoinGroupRejectedNotification = async (req, res) => {
    const { triggered_by, group_id } = req.body;
    await saveNotification({
        notification_type: 'groupRequestRejected',
        triggered_by: req.adminId, // The admin who rejected the request
        received_by: triggered_by, // The user who sent the request
        group_id,
    }, res);
};


// Create a comment notification
const createCommentNotification = async (req, res) => {
    const { triggered_by, received_by, post_id, comment_id } = req.body;
    await saveNotification({
        notification_type: 'comment',
        triggered_by,
        received_by,
        post_id,
        comment_id,
    }, res);
};

// Create a reaction notification
const createReactionNotification = async (req, res) => {
    const { triggered_by, received_by, post_id, reaction_id } = req.body;
    await saveNotification({
        notification_type: 'reaction',
        triggered_by,
        received_by,
        post_id,
        reaction_id,
    }, res);
};

// Create a post notification for friends/followers
const createPostNotificationForFriends = async (req, res) => {
    const { triggered_by, received_by, post_id } = req.body;
    await saveNotification({
        notification_type: 'postCreatedForFriends',
        triggered_by,  // User who created the post
        received_by,   // Friend/follower
        post_id,
    }, res);
};

const createPostNotificationForGroup = async (req, res) => {
    const { triggered_by, group_id, post_id } = req.body;
  
    // Validate post, group, and user existence
    const post = await Post.findById(post_id);
    const group = await Group.findById(group_id);
    const user = await User.findById(triggered_by);
  
    if (!post || !group || !user) {
      return res.status(400).json({ error: 'Invalid post, group, or user' });
    }
  
    // Create notification
    try {
      const newNotification = new Notification({
        notification_type: 'postCreatedForGroup',
        triggered_by,
        received_by: group.members,  // Assuming you're notifying all group members
        post_id,
        group_id,
      });
      await newNotification.save();
      res.status(201).json(newNotification);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create notification' });
    }
  };

const createNewUserNotification = async (req, res) => {
    const { triggered_by, received_by } = req.body;
    await saveNotification({
        notification_type: 'newUserCreated',
        triggered_by,  // System admin or system event
        received_by,   // New user's ID
    }, res);
};

// Delete a notification
const deleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await notificationModel.findById(id);
        if (!notification) return res.status(404).json({ error: 'Notification not found' });

        await notification.deleteOne();
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the notification.' });
    }
};
const markNotificationAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await notificationModel.findByIdAndUpdate(id, { isRead: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.json(notification);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while marking the notification as read.' });
    }
};

module.exports = {
    getAllNotifications,
    getOneNotification,
    createFriendRequestNotification,
    createFriendAcceptedNotification,
    createFriendRejectedNotification,
    createGroupCreationNotification,
    createGroupEditedNotification,
    createGroupDeletedNotification,
    createJoinGroupRequestNotification,
    createNewUserNotification,
    createJoinGroupAcceptedNotification,
    createJoinGroupRejectedNotification,
    createPostNotificationForFriends,
    createPostNotificationForGroup,
    createCommentNotification,
    createReactionNotification,
    deleteNotification,
    markNotificationAsRead
};