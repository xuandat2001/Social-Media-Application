const express = require('express');
const { getAcceptedFriendships } = require('../controllers/friendShipController');
const friendShipRouter = express.Router();
friendShipRouter.get('/api/acceptedFriend', getAcceptedFriendships);
module.exports = { friendShipRouter };