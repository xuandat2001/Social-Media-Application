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

const verify = (req, res) => {
    const { signedCookies } = req;
    if (signedCookies && signedCookies.username) {
        return res.json({ message: 'Cookie is valid!' });
    } else {
        return res.status(401).json({ message: 'Unauthorized: Invalid cookie' });
    }
};

module.exports = {
    login,
    verify,
};