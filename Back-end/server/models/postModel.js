const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: String,
  numberOfReaction: Number,
  numberOfComment: Number,
  post_access_right: String,
  image_url: String,
  email:String,
  createdAt: {
    type: Date,
    default: new Date(),
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  originalPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    default: null,
  },
});
const Post = mongoose.models.Post || mongoose.model("posts", postSchema);

module.exports = Post;
