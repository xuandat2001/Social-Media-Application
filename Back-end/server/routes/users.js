const express = require('express');
const userController = require('../controllers/userController')
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.get('/', userController.get);
router.post('/register', express.json(), registerController.register);
router.post('/login', express.json(), loginController.login);

// POST request to verify credentials


exports.userRoutes = router;