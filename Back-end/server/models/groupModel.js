const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
    groupName: String,
});
const Group = mongoose.models.Group || mongoose.model('Group', groupSchema);

module.exports = Group;
