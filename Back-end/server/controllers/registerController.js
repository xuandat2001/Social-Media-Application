const users = require('../data.js').users;

const register = (req, res, next) => {
    const { username, password, confirmPassword } = req.body;
    const ids = users.map((p)=> p.id);
    const maxId = Math.max(...ids);
    const newId = maxId + 1;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Check if the username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists.' });
    }

    // Create a new user
    const newUser = {
         // Generate a new ID
        newId,
        username,
        password
    };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully!' });
};

module.exports = {
    register
};
