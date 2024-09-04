const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    fullName: String,
    picture_url: String
});
const User = mongoose.models.User || mongoose.model('users', userSchema);
module.exports = User;
