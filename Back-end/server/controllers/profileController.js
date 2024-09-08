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


  // const updateProfile = async (req, res) => {
  //   console.log('Update Profile Request:', req.params.profileId, req.body);
  //   try {
  //     const profile = req.findProfile; // Use the profile document from middleware
  //     const { bio } = req.body;
  
  //     if (!profile) {
  //       return res.status(404).json({ message: 'Profile not found' });
  //     }
  
  //     // Update the profile with new data
  //     profile.bio = bio;
  //     const updatedProfile = await profile.save(); // Save the updated profile
  
  //     res.status(200).json(updatedProfile); // Respond with the updated profile
  //   } catch (error) {
  //     console.error('Error updating profile:', error.message); // Log the error message
  //     res.status(500).json({ message: 'Server error', error: error.message });
  //   }
  // };

module.exports = { getProfile, /*updateProfile*/ };