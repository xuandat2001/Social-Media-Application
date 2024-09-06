const memberShipModel = require('../models/membershipModel.js')
const userModel = require('../models/userModel.js');

const getAllMemberShips = async (req, res) => {
    const { query: { filter, value } } = req;
        let query = {};
        if (filter && value) {
            query[filter] = { $regex: value, $options: 'i' }; //Case-insensitive search
        }
        const groups = await memberShipModel.find(query);
        res.send(groups);
};
const getOneMemberShip =  async(req, res) => {
    const { findMemberShip } = req;
    if (!findMemberShip) {
        return res.status(400).send({ msg: "MemberShip Not Found" });
    }
    res.send(findMemberShip);
};
const createNewMemberShip = async(req, res) => {
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
        const existingGroup = await groupModel.findById(data.group);
        if (!existingGroup) {
            return res.status(404).send({ error: "Group does not exist." });
        }
        // Create a new group instance
        const newMemberShip = new memberShipModel(data);
        
        // Save the new group to the database
        const savedMemberShip = await newMemberShip.save();
        
        // Respond with the created group
        res.status(201).send(savedMemberShip);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).send({ error: "An error occurred while creating the group." });
    }
};
const editMemberShip = async(req, res) => {
    const { body, findMemberShip } = req;
    Object.assign(findMemberShip, body);
    await findMemberShip.save();
    return res.sendStatus(200);
};
const  deleteMemberShip = async (req, res) => {
    const { findMemberShip } = req;
    await findMemberShip.remove(); 
    return res.sendStatus(200);
};

module.exports = {getAllMemberShips,getOneMemberShip,createNewMemberShip,editMemberShip,deleteMemberShip};
