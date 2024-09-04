const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: String,
    numberOfReaction: Number,
    numberOfComment: Number,
    post_access_right: String,
    image_url: String,
    createdAt: {
        type: Date,
        default: new Date()
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    } 
});
const Post = mongoose.models.Post || mongoose.model('posts', postSchema);

module.exports = Post;
