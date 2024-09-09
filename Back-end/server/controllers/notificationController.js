const notificationModel = require('../models/notificationModel.js');
const { validationResult } = require('express-validator');
const friednshipModel  = require('../models/friendshipModel.js')
// Common function to save a notification
const saveNotification = async (notificationData, res) => {
    try {
        const newNotification = new notificationModel(notificationData);
        const savedNotification = await newNotification.save();
        res.status(200).json(savedNotification);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving the notification.' });
    }
};


// Fetch all notifications for a user
const getAllNotifications = async (req, res) => {
    try {
        
        const userId = req.params.userId;
        // Now using userId from params instead of authentication

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

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
        res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
};

// Create a friend request notification
const createFriendRequestNotification = async (req, res) => {
    const { triggered_by, received_by } = req.body;
    const result = await sendFriendRequest(triggered_by, received_by);
    return res.status(200).send(result);
}
// Create a friend request notification
const sendFriendRequest = async (triggered_by, received_by) => {
    try {
        // Check if the friendship already exists
        const existingFriendship = await friednshipModel.findOne({
            $or: [
                { user1_id: triggered_by, user2_id: received_by },
                { user1_id: received_by, user2_id: triggered_by },
            ],
        });

        if (existingFriendship) {
            return { msg: 'Friend request already sent or accepted.' };
        }

        // Create a new friendship request
        const newFriendship = new friednshipModel({
            user1_id: triggered_by,
            user2_id: received_by,
            status: 'pending',
        });
        await newFriendship.save();

        // Create a notification for the receiver
        const newNotification = new notificationModel({
            notification_type: 'friendRequest',
            triggered_by: received_by,
            received_by: triggered_by,
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

const createPostNotification = async (req, res) => {
    const { triggered_by, received_by, post_id } = req.body;
    // Create notification
    try {
      const newNotification = new Notification({
        notification_type: 'postCreated',
        triggered_by,
        received_by,
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
    try {
        const notificationId = req.params.id;

        const deletedNotification = await notificationModel.findByIdAndDelete(notificationId);

        if (!deletedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification', error: error.message });
    }
};
const markNotificationAsRead = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming `req.user.id` contains the authenticated user's ID
  
      const updatedNotifications = await notificationModel.updateMany(
        { userId: userId, isRead: false }, // Find all unread notifications for this user
        { isRead: true }                   // Mark them as read
      );
  
      if (updatedNotifications.modifiedCount === 0) {
        return res.status(404).json({ message: 'No unread notifications found' });
      }
  
      res.status(200).json({ message: 'All notifications marked as read', updatedCount: updatedNotifications.modifiedCount });
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      res.status(500).json({ message: 'Error marking notifications as read', error: error.message });
    }
  };
module.exports = {
    getAllNotifications,
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
    createPostNotification,
    createCommentNotification,
    createReactionNotification,
    deleteNotification,
    markNotificationAsRead
};