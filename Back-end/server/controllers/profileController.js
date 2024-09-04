const UserProfile = require('../models/profileModel');

const getProfile = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const userProfile = await UserProfile.findById(userId);
      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
  
      res.json(userProfile);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

module.exports = { getProfile };