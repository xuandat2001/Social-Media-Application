const express = require('express');
const router = express.Router();
const { users } = require('.../data.js');
const cookieParser = require('cookie-parser');
const COOKIE_SECRET = require('../cookieSecret');

router.use(cookieParser(COOKIE_SECRET));

// POST request to verify credentials
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.cookie('username', username, { signed: true, httpOnly: true });
        res.json({ message: 'Login successful!' });
    } else {
        res.status(400).json({ message: 'Invalid username or password' });
    }
});

module.exports = router;
