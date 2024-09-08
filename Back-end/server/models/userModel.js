const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true // Remember to hash this before saving
    },
    fullName: {
        type: String,
        required: true
    },
    userAvatar: {
        type: String, // URL or base64 string for the avatar
        required: true
    },
    email:{
        type: String, // URL or base64 string for the avatar
        required: false
    }
});

const User = mongoose.models.User || mongoose.model('users', userSchema);

module.exports = User;
