const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const fs = require('fs');
const { createFriendRequestNotification, createFriendAcceptedNotification, createFriendRejectedNotification, createNewUserNotification  } = require('../controllers/notificationController');


const getAllUsers = async (req, res) => {
    try {
        // Assuming the logged-in user's ID is stored in the session (e.g., req.session.userId)
        const loggedInUserId = req.session.userId;

        // Fetch all users except the logged-in user
        const users = await userModel.find({ _id: { $ne: loggedInUserId } });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
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




const editUser = async (req, res) => {
    try {
        const userId = req.params.id; // Ensure you are extracting userId correctly
        const { body } = req;

        // Fetch the user from the database
        const findUser = await userModel.findById(userId);
        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Keep existing image hash if no new image is uploaded
        let userAvatar = findUser.userAvatar;

        // Check if a new image file is uploaded
        if (req.file) {
            // Convert the new image to Base64 and update `userAvatar`
            userAvatar = fs.readFileSync(req.file.path, { encoding: 'base64' });

            // Remove the temporary file after reading it
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting temp file:', err);
            });
        }

        // Update the user information
        findUser.fullName = body.fullName || findUser.fullName;
        findUser.userAvatar = userAvatar;
        findUser.email = body.email || findUser.email;

        // Save the updated user
        await findUser.save();
        return res.status(200).json({
            message: 'Profile updated successfully!',
            findUser: {
                id: findUser.id, // Use findUser instead of user
                fullName: findUser.fullName,
                email: findUser.email,
                userAvatar: findUser.userAvatar
            }
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(400).json({ error: "Failed to update user" });
    }
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
