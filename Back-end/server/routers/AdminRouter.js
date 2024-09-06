const express = require('express');
const { loginAdmin, createNewAdmin} = require('../controllers/adminController.js');
const adminRouter = express.Router();

adminRouter.post('/api/admin/login', loginAdmin);
adminRouter.post('/api/admin', createNewAdmin);


module.exports = { adminRouter };