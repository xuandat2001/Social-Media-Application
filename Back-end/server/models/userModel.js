const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    fullName: String,
    userAvatar: String
});
const User = mongoose.models.User || mongoose.model('users', userSchema);
module.exports = User;
