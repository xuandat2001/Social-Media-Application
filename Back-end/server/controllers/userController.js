const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const fs = require('fs');

const getAllUsers = async (req, res) => {
    const { query: { filter, value } } = req;
        let query = {};
        if (filter && value) {
            query[filter] = { $regex: value, $options: 'i' }; // Case-insensitive search
        }
        const users = await userModel.find(query);
        res.send(users);
};

const getOneUser =  async(req, res) => {
    const { findUser } = req;
    if (!findUser) {
        return res.status(400).send({ msg: "User Not Found" });
    }
    res.send(findUser);
};

const createNewUser = async (req, res) => {
    const { fullName, userName, password } = req.body;
    let userAvatar = null;
    
    if(req.file) {
        // Read the image file from the temporary location
        userAvatar = fs.readFileSync(req.file.path, { encoding: 'base64' });
    }
    
    try {
        // Hash the password before saving the user
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // Create and save the new user
        const newUser = new userModel({
            userName,
            password: hashedPassword,
            fullName,
            userAvatar,
        });
        const savedUser = await newUser.save();

        // Return the saved user
        res.status(201).json({ message: 'New user successfully created' })
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

const editUser = async(req, res) => {
    const { body, findUser } = req;
    Object.assign(findUser, body);
    await findUser.save();
    return res.sendStatus(200);
};
const  deleteUser = async (req, res) => {
    const { findUser } = req;
    await findUser.deleteOne(); 
    return res.sendStatus(200);
};

module.exports = {getAllUsers,getOneUser,createNewUser,editUser,deleteUser};
