const friendshipModel = require('../models/friendshipModel');
const getAcceptedFriendships = async (req,res) => {
  const user1Id = req.params.userId;

  try {
    const acceptedFriendships = await friendshipModel.find({
      user1_id: user1Id,
      status: 'accept',
    })
      .select('user2_id') // Select only the user2_id field
      .populate('user2_id', 'fullName userAvatar email'); // Populate user2 details (add fields like fullName, userAvatar, etc.)

    if (!acceptedFriendships) {
      return res.status(404).json({ message: 'No accepted friendships found' });
    }

    res.json(acceptedFriendships);
  } catch (err) {
    console.error('Error fetching accepted friendships:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
  module.exports = {getAcceptedFriendships};