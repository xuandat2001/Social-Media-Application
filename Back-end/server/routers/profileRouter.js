const express = require('express');
const profileRouter = express.Router();
const { getProfile } = require('../controllers/profileController');

profileRouter.get('/api/profile/:profileId', getProfile);

module.exports = { profileRouter };
