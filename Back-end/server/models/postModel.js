const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: String,
    numberOfReaction: Number,
    numberOfComment: Number,
});
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post;
