// const mongoose = require('mongoose');
// const User = require('./userModel');
// const Post = require('./postModel');
// const Groups = require('./groupModel');

// const profileSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: User,
//   },
//   bio: String,
// //   profileImage: String, // image assets may require linking later
//   posts: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: Post,
//   }],
//   friends: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: User,  //replace with friendships from friendshipModel.js once friends db has been setup
//   }],
//   groups: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: Groups,
//   }],
// }, { timestamps: true });

// const Profile = mongoose.models.profile || mongoose.model('Profile', profileSchema);
// module.exports = Profile;
