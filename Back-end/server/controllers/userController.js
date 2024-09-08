const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const fs = require('fs');
const { createFriendRequestNotification, createFriendAcceptedNotification, createFriendRejectedNotification, createNewUserNotification  } = require('../controllers/notificationController');

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

        // Trigger notification for new user creation
        await createNewUserNotification({
            body: { triggered_by: 'SystemAdminId', received_by: savedUser._id },  // Replace 'SystemAdminId' with actual admin ID if needed
        }, res);

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

// Send a friend request
const sendFriendRequest = async (req, res) => {
    const { userId, targetUserId } = req.body;

    try {
        // Logic to send friend request
        await userModel.updateOne({ _id: userId }, { $addToSet: { friendRequestsSent: targetUserId } });
        await userModel.updateOne({ _id: targetUserId }, { $addToSet: { friendRequestsReceived: userId } });

        // Trigger friend request notification
        await createFriendRequestNotification({
            body: { triggered_by: userId, received_by: targetUserId }
        }, res);

        res.status(200).json({ message: 'Friend request sent!' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending friend request.' });
    }
};
// Accept a friend request
const acceptFriendRequest = async (req, res) => {
    const { userId, targetUserId } = req.body;

    try {
        // Logic to accept the friend request
        await userModel.updateOne({ _id: userId }, { $addToSet: { friends: targetUserId }, $pull: { friendRequestsReceived: targetUserId } });
        await userModel.updateOne({ _id: targetUserId }, { $addToSet: { friends: userId }, $pull: { friendRequestsSent: userId } });

        // Trigger friend accepted notification
        await createFriendAcceptedNotification({
            body: { triggered_by: userId, received_by: targetUserId }
        }, res);

        res.status(200).json({ message: 'Friend request accepted!' });
    } catch (error) {
        res.status(500).json({ error: 'Error accepting friend request.' });
    }
};

// Reject a friend request
const rejectFriendRequest = async (req, res) => {
    const { userId, targetUserId } = req.body;

    try {
        // Logic to reject the friend request
        await userModel.updateOne({ _id: userId }, { $pull: { friendRequestsReceived: targetUserId } });
        await userModel.updateOne({ _id: targetUserId }, { $pull: { friendRequestsSent: userId } });

        // Trigger friend rejected notification
        await createFriendRejectedNotification({
            body: { triggered_by: userId, received_by: targetUserId }
        }, res);

        res.status(200).json({ message: 'Friend request rejected.' });
    } catch (error) {
        res.status(500).json({ error: 'Error rejecting friend request.' });
    }
};
module.exports = {getAllUsers,getOneUser,createNewUser,editUser,deleteUser, sendFriendRequest, acceptFriendRequest, rejectFriendRequest};
