const groupModel = require('../models/groupModel.js'); 
const userModel = require('../models/userModel.js');
const { matchedData, validationResult } = require('express-validator');

const getAllGroups = async (req, res) => {
    const { query: { filter, value } } = req;
        let query = {};
        if (filter && value) {
            query[filter] = { $regex: value, $options: 'i' }; //Case-insensitive search
        }
        const groups = await groupModel.find(query);
        res.send(groups);
};
const getOneGroup =  async(req, res) => {
    const { findGroup } = req;
    if (!findGroup) {
        return res.status(400).send({ msg: "Group Not Found" });
    }
    res.send(findGroup);
};
const createNewGroup = async(req, res) => {
    const data = req.body;
    // Ensure the user ID is present in the body
    console.log('Request body:', req.body);
    if (!data.user) {
        return res.status(400).send({ error: "User ID is required." });
    }
    try {
        // Check if the user exists
        const existingUser = await userModel.findById(data.user);
        if (!existingUser) {
            return res.status(404).send({ error: "User does not exist." });
        }
        // Create a new group instance
        const newGroup = new groupModel(data);
        
        // Save the new group to the database
        const savedGroup = await newGroup.save();
        
        // Respond with the created group
        res.status(201).send(savedGroup);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).send({ error: "An error occurred while creating the group." });
    }
};
const editGroup = async(req, res) => {
    const { body, findGroup } = req;
    Object.assign(findGroup, body);
    await findGroup.save();
    return res.sendStatus(200);
};
const  deleteGroup = async (req, res) => {
    const { findGroup } = req;
    await findGroup.remove(); 
    return res.sendStatus(200);
};

module.exports = {getAllGroups,getOneGroup,createNewGroup,editGroup,deleteGroup};
