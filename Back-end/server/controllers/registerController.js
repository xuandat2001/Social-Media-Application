const UserModel = require('../models/userModel')

const register = (req, res, next) => {
    const { username, password, confirmPassword } = req.body;
    
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Check if the username already exists
    const existingUser = UserModel.find(user => user.username === username);
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists.' });
    }

    // Create a new user
    const newUser = {
         // Generate a new ID
        
        username,
        password
    };
    UserModel.push(newUser);

    res.status(201).json({ message: 'User registered successfully!' });
};

module.exports = {
    register
};
