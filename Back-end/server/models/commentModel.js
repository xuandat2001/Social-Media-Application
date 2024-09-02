const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content: String,
});
const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema); // Avoiding OverwriteModelError
module.exports = Comment;