const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: String,
    password: String,
    pictureURL: String,

});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;