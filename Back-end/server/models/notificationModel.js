const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notification_type: String,
    notification_date: {
        type: Date,
        default: new Date(),
    },
    triggered_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    received_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups',
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments',
    },
    reaction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reactions',
    }, 
    isRead: {
        type: Boolean,
        default: false, 
    }
});

const Notification = mongoose.models.Notification || mongoose.model('notifications', notificationSchema);
module.exports = Notification;
