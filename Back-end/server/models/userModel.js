const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
});
const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
