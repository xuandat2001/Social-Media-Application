const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notiType: { 
        type: String, 
        required: true 
    }, // Type of notification ('friendRequest', 'groupRequest', etc.)
    userId: { 
        type: String, 
        required: true 
    }, // The ID of the user who will receive the notification
    targetUserId: { 
        type: String 
    }, // The ID of the user who triggered the notification (e.g., who sent the friend request)
    groupId: { 
        type: String 
    }, // If the notification is related to a group, the group ID
    postId: { 
        type: String 
    }, // If the notification is related to a post, the post ID
    isRead: { type: Boolean, default: false },
    createdAt: { 
        type: Date, 
        default: Date.now 
    } // Timestamp for when the notification was created
});


const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
module.exports = Notification;
