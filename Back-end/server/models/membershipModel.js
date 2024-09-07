const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    group_name: {
        type: String,
        required: true,
    },
    group_access_right: {
        type: String,
        required: true,
    },
    groupPicture: {
        type: String,  // Store image as Base64 string
        required: false,  // Optional field for the image
    },
    status: {
        type: String,
        default: 'pending',
    },
    member_role: {
        type: String,
        default: 'admin',
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,  // Automatically create createdAt and updatedAt fields
});

const Membership = mongoose.models.Membership || mongoose.model('memberships', membershipSchema);
module.exports = Membership;
