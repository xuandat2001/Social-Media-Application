const express = require('express');
const profileRouter = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { findProfileById } = require('../middleware/findObject');

profileRouter.get('/api/profile', getProfile);
// profileRouter.put('/api/profile/:profileId', findProfileById, updateProfile);

module.exports = {profileRouter};
