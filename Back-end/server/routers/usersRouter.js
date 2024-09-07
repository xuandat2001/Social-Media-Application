const express = require('express');
const { getAllUsers, getOneUser, createNewUser, editUser, deleteUser } = require('../controllers/userController.js');
const { findUserById } = require('../middleware/findObject.js');
const userRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'avtuploads/' });

userRouter.get('/api/users', getAllUsers);
userRouter.get('/api/users/:id', findUserById, getOneUser);
userRouter.post('/api/users/register', upload.single('userAvatar') ,createNewUser);
userRouter.put('/api/users/:id', findUserById, editUser);
userRouter.delete('/api/users/:id', findUserById, deleteUser);

module.exports = { userRouter };
