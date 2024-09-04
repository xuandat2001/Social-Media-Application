const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
});

const Comment = mongoose.models.Comment || mongoose.model('comments', commentSchema); // Avoiding OverwriteModelError
module.exports = Comment;