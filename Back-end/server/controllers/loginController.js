const cookieParser = require('cookie-parser');
const COOKIE_SECRET = require('../cookieSecret');
const { users } = require('../data.js');



const login = (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.cookie('username', username, { signed: true, httpOnly: true });
        return res.json({ message: 'Login successful!' });
    } else {
        res.status(400).json({ message: 'Invalid username or password' });
    }
};

module.exports = {
    login
};