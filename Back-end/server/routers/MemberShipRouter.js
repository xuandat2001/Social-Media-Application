const express = require('express');
const multer = require('multer');
const {getOneMemberShip,getAllGroupCreationRequest,createNewMemberShip,editMemberShip,deleteMemberShip,rejectGroupCreationRequest } = require('../controllers/membershipController.js');
const { findMemberShipById } = require('../middleware/findObject.js');
const memberRouter = express.Router();
const upload = multer({ dest: 'uploads/' }); // Define the destination folder for uploads
memberRouter.get('/api/all-group-requests', getAllGroupCreationRequest);
memberRouter.get('/api/memberships/:id', findMemberShipById, getOneMemberShip);
memberRouter.post('/api/group-requests', upload.single('groupPicture'),createNewMemberShip);
memberRouter.post('/api/group-requests/:id/reject', rejectGroupCreationRequest);
memberRouter.put('/api/memberships/:id', findMemberShipById, editMemberShip);
memberRouter.delete('/api/memberships/:id', findMemberShipById, deleteMemberShip);

module.exports = { memberRouter };