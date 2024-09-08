const groupModel = require('../models/groupModel.js'); 
const userModel = require('../models/userModel.js');
const membershipModel = require('../models/membershipModel.js'); 
const { matchedData, validationResult } = require('express-validator');
const { createGroupCreationNotification,createGroupEditedNotification,createGroupDeletedNotification  } = require('../controllers/notificationController');

const getUserGroups = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find groups where the user is the admin
      const adminGroups = await groupModel.find({ user: userId });
  
      // Find groups where the user is a member (and isApproved)
      const memberGroups = await membershipModel.find({ user_id: userId, isApproved: true }).populate('group_name');
  
      // Combine the groups from both queries
      const allGroups = {
        adminGroups: adminGroups,
        memberGroups: memberGroups
      };
  
      res.status(200).json(allGroups);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user groups', error });
    }
  };
const getOneGroup =  async(req, res) => {
    const { findGroup } = req;
    if (!findGroup) {
        return res.status(400).send({ msg: "Group Not Found" });
    }
    res.send(findGroup);
};
const createNewGroup = async (req, res) => {
    try {
        // Find the membership request by ID
        const request = await membershipModel.findById(req.params.id);

        // If the request is not found, return a 404 error
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // If the request has already been approved, return a 400 error
        if (request.status === 'accepted') {
            return res.status(400).json({ error: 'Request already approved' });
        }

        // Create the group using the Group model
        const newGroup = new groupModel({
            group_name: request.group_name,
            group_access_right: request.group_access_right,
            groupPicture: request.groupPicture,
            user: request.user_id,  // The user who requested the group will be the admin
        });

        // Save the new group to the database
        const savedGroup = await newGroup.save();

        // Update the membership request to reflect the approval
        request.status = 'accepted';
        request.isApproved = true;

        // Save the updated request
        await request.save();
        
        await createGroupCreationNotification({
            body: { triggered_by: req.adminId, received_by: request.user_id, group_id: savedGroup._id }
        }, res);
        // Respond with a success message and the created group
        res.status(200).json({ message: 'Group created successfully', group: savedGroup });
    } catch (error) {
        console.error('Error approving group request:', error);
        res.status(500).json({ error: 'Error approving group request' });
    }
};



const editGroup = async(req, res) => {
    const { body, findGroup } = req;
    try {
        // Notify group members about the edit
        const members = await membershipModel.find({ group_id: findGroup._id, isApproved: true });
        for (const member of members) {
            await createGroupEditedNotification({
                body: { triggered_by: req.adminId, received_by: member.user_id, group_id: findGroup._id }
            }, res);
        }

        // Update group details
        Object.assign(findGroup, body);
        await findGroup.save();
        return res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: 'Error updating group' });
    }
};
const  deleteGroup = async (req, res) => {
    const { findGroup } = req;

    try {
        // Notify all members about the group deletion
        const members = await membershipModel.find({ group_id: findGroup._id, isApproved: true });
        for (const member of members) {
            await createGroupDeletedNotification({
                body: { triggered_by: req.adminId, received_by: member.user_id, group_id: findGroup._id }
            }, res);
        }

        // Delete the group
        await findGroup.remove();
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting group' });
    }
};

module.exports = {getUserGroups,getOneGroup,createNewGroup,editGroup,deleteGroup};
