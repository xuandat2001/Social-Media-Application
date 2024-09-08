const express = require('express');
const profileRouter = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { findProfileById } = require('../middleware/findObject');

profileRouter.get('/api/profile', getProfile); // Fetch profile
profileRouter.put('/api/profile/:profileId', updateProfile); // Update profile by ID

module.exports = {profileRouter};
