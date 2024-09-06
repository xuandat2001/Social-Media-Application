const express = require('express');
const {getAllMemberShips,getOneMemberShip,createNewMemberShip,editMemberShip,deleteMemberShip } = require('../controllers/membershipController.js');
const { findMemberShipById } = require('../middleware/findObject.js');
const memberRouter = express.Router();

memberRouter.get('/api/memberships', getAllMemberShips);
memberRouter.get('/api/memberships/:id', findMemberShipById, getOneMemberShip);
memberRouter.post('/api/memberships', createNewMemberShip);
memberRouter.put('/api/memberships/:id', findMemberShipById, editMemberShip);
memberRouter.delete('/api/memberships/:id', findMemberShipById, deleteMemberShip);

module.exports = { memberRouter };