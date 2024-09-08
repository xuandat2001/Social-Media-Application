const express = require('express');
const { getAcceptedFriendships } = require('../controllers/friendShipController');
const friendShipRouter = express.Router();
friendShipRouter.get('/friends/accepted/:userId', getAcceptedFriendships);
module.exports = { friendShipRouter };