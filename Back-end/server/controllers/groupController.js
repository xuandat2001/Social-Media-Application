const groupModel = require('../models/groupModel.js'); 
const { matchedData, validationResult } = require('express-validator');

const getAllGroups = async (req, res) => {
    const { query: { filter, value } } = req;
        let query = {};
        if (filter && value) {
            query[filter] = { $regex: value, $options: 'i' }; //Case-insensitive search
        }
        const groups = await groupModel.find(query);
        res.send(groups);
};
const getOneGroup =  async(req, res) => {
    const { findGroup } = req;
    if (!findGroup) {
        return res.status(400).send({ msg: "Group Not Found" });
    }
    res.send(findGroup);
};
const createNewGroup = async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ errors: result.array() });
    const data = matchedData(req);
    const newGroup = new groupModel(data);
    const savedGroup = await newGroup.save();
    res.status(201).send(savedGroup);
};
const editGroup = async(req, res) => {
    const { body, findGroup } = req;
    Object.assign(findGroup, body);
    await findGroup.save();
    return res.sendStatus(200);
};
const  deleteGroup = async (req, res) => {
    const { findGroup } = req;
    await findGroup.remove(); 
    return res.sendStatus(200);
};

module.exports = {getAllGroups,getOneGroup,createNewGroup,editGroup,deleteGroup};
