const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups',
        required: true,
    },
    status: String,
    member_role: String,
});

const Membership = mongoose.models.Membership || mongoose.model('memberships', membershipSchema);
module.exports = Membership;