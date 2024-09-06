const UserProfile = require('../models/profileModel');

const getProfile = async (req, res) => {
  
    try {
      const userProfile = await UserProfile.findById(req.params.profileId)
        .populate('userId', 'userName')
        .populate('posts')
        .populate('groups')
        .exec();
      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
  
      console.log('UserProfile:', userProfile);
      res.status(200).json(userProfile);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

module.exports = { getProfile };