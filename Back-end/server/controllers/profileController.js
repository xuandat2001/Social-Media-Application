const UserProfile = require('../models/profileModel');

const getProfile = async (req, res) => {
  
    try {
      const userProfile = req.findProfile;
        
      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
  
      // Check if the authenticated user ID matches the profile's user ID
      if (profile.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      await userProfile.populate('userId', 'userName')
      .populate('posts')
      .populate('groups')
      .execPopulate();

      console.log('UserProfile:', userProfile);
      res.status(200).json(userProfile);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  const updateProfile = async (req, res) => {
    console.log('Update Profile Request:', req.params.profileId, req.body);
    try {
      const profile = req.findProfile; // Use the profile document from middleware
      const { bio } = req.body;
  
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      // Update the profile with new data
      profile.bio = bio;
      const updatedProfile = await profile.save(); // Save the updated profile
  
      res.status(200).json(updatedProfile); // Respond with the updated profile
    } catch (error) {
      console.error('Error updating profile:', error.message); // Log the error message
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

module.exports = { getProfile, updateProfile };