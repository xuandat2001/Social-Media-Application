const UserProfile = require('../models/profileModel');
const mongoose = require('mongoose');

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id) && String(id).length === 24;
};

const getProfile = async (req, res) => {
  const { userId } = req.query; // Expecting the userId as a query param from the front-end

  if (!userId || !isValidObjectId(userId)) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const userProfile = await UserProfile.findOne({ 'userId': new mongoose.Types.ObjectId(userId) }) 
      .populate('userId', 'userName')
      .populate('posts') 
      .exec();

    console.log(userProfile);


    if (!userProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const updateProfile = async (req, res) => {
  const { profileId } = req.params;  // Extract profile ID from the request parameters
  const updatedData = req.body;  // Extract the updated profile data from the request body

  try {
      // Find the profile by its ID
      const profile = await UserProfile.findById(profileId);

      if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
      }

      if (updatedData.bio) {
          profile.bio = updatedData.bio;
      }

      if (updatedData.userId?.userName) {
          profile.userId.userName = updatedData.userId.userName;
      }

      if (updatedData.userId?.password) {
          profile.userId.password = updatedData.userId.password;
      }

      const updatedProfile = await profile.save();

      res.status(200).json(updatedProfile);
  } catch (error) {
      console.error('Error updating profile:', error.message);  
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};



module.exports = { getProfile, updateProfile };