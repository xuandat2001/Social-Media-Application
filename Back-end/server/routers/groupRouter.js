const express = require('express');
const { getAllGroups,getOneGroup,createNewGroup,editGroup,deleteGroup } = require('../controllers/groupController.js');
const { checkSchema } = require('express-validator');
const { createGroupValidationSchema } = require('../validation/validationSchema.js');
const { findGroupById } = require('../middleware/findObject.js');
const groupRouter = express.Router();

groupRouter.get('/api/groups', getAllGroups);
groupRouter.get('/api/groups/:id', findGroupById, getOneGroup);
groupRouter.post('/api/groups', checkSchema(createGroupValidationSchema), createNewGroup);
groupRouter.put('/api/groups/:id', findGroupById, editGroup);
groupRouter.delete('/api/groups/:id', findGroupById, deleteGroup);

module.exports = { groupRouter };