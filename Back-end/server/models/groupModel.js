const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    group_name: String,
    group_access_right: String,
    groupPicture: String,
    user: { // admin
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
});
const Group = mongoose.models.Group || mongoose.model('groups', groupSchema);

module.exports = Group;
