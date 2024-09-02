const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    notiType:String,
});
const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
module.exports = Notification;