const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: true,
    },
    reaction_type: String,
});

const Reaction = mongoose.models.Reaction || mongoose.model('reactions', reactionSchema);
module.exports = Reaction;
