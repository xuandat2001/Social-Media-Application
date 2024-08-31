const express = require('express');
const userController = require('../controllers/userController')
const registerController = require('../controllers/registerController');

const router = express.Router();

router.get('/', userController.get);
router.post('/register', express.json(), registerController.register);

exports.userRoutes = router;