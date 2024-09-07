const memberShipModel = require('../models/membershipModel.js')
const userModel = require('../models/userModel.js');
const fs = require('fs');

const getAllGroupCreationRequest = async (req, res) => {
    try {
        const pendingRequests = await memberShipModel.find({ status: 'pending', member_role:'admin',isApproved: false });
        res.status(200).json(pendingRequests);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch group requests' });
      }
};
const getOneMemberShip =  async(req, res) => {
    const { findMemberShip } = req;
    if (!findMemberShip) {
        return res.status(400).send({ msg: "MemberShip Not Found" });
    }
    res.send(findMemberShip);
};

const rejectGroupCreationRequest = async(req, res) => {
    const { id } = req.params;

    try {
      // Find the request by ID and update its status to rejected
      const updatedRequest = await memberShipModel.findByIdAndUpdate(
        id,
        { status: 'rejected', isApproved: true }, // Set status to 'rejected' and isApproved to true
        { new: true } // Return the updated document
      );
  
      if (!updatedRequest) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      res.status(200).json({ message: 'Group request rejected', request: updatedRequest });
    } catch (error) {
      console.error('Error rejecting request:', error);
      res.status(500).json({ error: 'Failed to reject the group request' });
    }
};


const createNewMemberShip = async (req, res) => {
    const { group_name, group_access_right, user_id } = req.body;
    let groupPicture = null;

    if (req.file) {
        // Read the image file from the temporary location
        groupPicture = fs.readFileSync(req.file.path, { encoding: 'base64' }); // Convert image file to Base64

        // Remove the file from the temporary folder
        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting temporary file:', err);
        });
    }

    try {
        // Create a new membership request with the image stored as Base64
        const newRequest = new memberShipModel({
            group_name,
            group_access_right,
            groupPicture,  // Store Base64-encoded image here
            user_id,
            status: 'pending',
            member_role: 'admin',
        });

        // Save the new group request
        const savedRequest = await newRequest.save();
        res.status(201).json({ message: 'Group creation request submitted', request: savedRequest });
    } catch (error) {
        res.status(500).json({ error: 'Error submitting group creation request' });
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

module.exports = {getAllGroupCreationRequest,getOneMemberShip,createNewMemberShip,editMemberShip,deleteMemberShip,rejectGroupCreationRequest};
