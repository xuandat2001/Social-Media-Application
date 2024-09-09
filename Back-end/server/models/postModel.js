const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: String,
  numberOfReaction: Number,
  numberOfComment: Number,
  post_access_right: String,
  image_url: String,
  email: String,
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
  isReported: {
    type: Boolean,
    default: false, // Default value is false (not reported)
  },
  reportDetails: {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // User who reported the post
      default: null,
    },
    reportReason: {
      type: String, // Reason for reporting
      default: "",
    },
    reportDate: {
      type: Date,
      default: null,
    },
  }, // <--- Add closing bracket here to end reportDetails
});

const Post = mongoose.models.Post || mongoose.model("posts", postSchema);

module.exports = Post;
