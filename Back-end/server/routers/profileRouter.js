const express = require('express');
const profileRouter = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { findProfileById } = require('../middleware/findObject');

profileRouter.get('/api/profile/:profileId', findProfileById, getProfile);
profileRouter.put('/api/profile/:profileId', findProfileById, updateProfile);

module.exports = {profileRouter};
