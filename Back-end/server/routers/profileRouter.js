const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profileController');

profileRouter.get('/:userId', profileController.getProfile);

module.exports = { profileRouter };
