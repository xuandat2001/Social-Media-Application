const express = require('express');
const { getUserGroups,getOneGroup,createNewGroup,editGroup,deleteGroup } = require('../controllers/groupController.js');
const { findGroupById } = require('../middleware/findObject.js');
const groupRouter = express.Router();

groupRouter.get('/api/user-groups/:userId', getUserGroups);
groupRouter.get('/api/groups/:id', findGroupById, getOneGroup);
groupRouter.post('/api/group-requests/:id/approve', createNewGroup);
groupRouter.put('/api/groups/:id', findGroupById, editGroup);
groupRouter.delete('/api/groups/:id', findGroupById, deleteGroup);

module.exports = { groupRouter };