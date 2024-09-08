const friendshipModel = require('../models/friendshipModel');
const getAcceptedFriendships = async () => {
    try {
      const acceptedFriendships = await friendshipModel.find({ status: 'accept' })
        .select('user2_id')  // Select only the user2_id field
        .populate('user2_id');  // Populate the user2_id field with user details if necessary
  
      return acceptedFriendships;
    } catch (err) {
      console.error('Error fetching accepted friendships:', err);
      throw err;
    }
  };

  module.exports = {getAcceptedFriendships};