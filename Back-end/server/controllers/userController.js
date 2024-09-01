const userModel = require('../models/userModel.js');
const { matchedData, validationResult } = require('express-validator');

const getAllUsers = async (req, res) => {
    const { query: { filter, value } } = req;
        let query = {};
        if (filter && value) {
            
            query[filter] = { $regex: value, $options: 'i' }; // Case-insensitive search
        }
        const users = await userModel.find(query);
        res.send(users);
};

const getOneUser =  async(req, res) => {
    const { findUser } = req;
    if (!findUser) {
        return res.status(400).send({ msg: "User Not Found" });
    }
    res.send(findUser);
};

const createNewUser = async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ errors: result.array() });
    const data = matchedData(req);
    const newUser = new userModel(data);
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
};

const editUser = async(req, res) => {
    const { body, findUser } = req;
    Object.assign(findUser, body);
    await findUser.save();
    return res.sendStatus(200);
};
const  deleteUser = async (req, res) => {
    const { findUser } = req;
    await findUser.remove(); 
    return res.sendStatus(200);
};

module.exports = {getAllUsers,getOneUser,createNewUser,editUser,deleteUser};
