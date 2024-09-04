const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    user1_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    user2_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    status: String,
});

const Friendship = mongoose.models.Friendship || mongoose.model('friendships', friendshipSchema); 
module.exports = Friendship;
