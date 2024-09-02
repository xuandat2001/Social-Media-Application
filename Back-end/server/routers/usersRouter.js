const express = require('express');
const { getAllUsers, getOneUser, createNewUser, editUser, deleteUser } = require('../controllers/userController.js');
const { checkSchema } = require('express-validator');
const { createUserValidationSchema } = require('../validation/validationSchema.js');
const { findUserById } = require('../middleware/findObject.js');
const userRouter = express.Router();

userRouter.get('/api/users', getAllUsers);
userRouter.get('/api/users/:id', findUserById, getOneUser);
userRouter.post('/api/users', checkSchema(createUserValidationSchema), createNewUser);
userRouter.put('/api/users/:id', findUserById, editUser);
userRouter.delete('/api/users/:id', findUserById, deleteUser);

module.exports = { userRouter };
