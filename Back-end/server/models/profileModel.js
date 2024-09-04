const mongoose = require('mongoose');

// Define the profile schema
const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  bio: String,
//   profileImage: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true });

const Profile = mongoose.model.profile || mongoose.model('Profile', profileSchema);
module.exports = Profile;
