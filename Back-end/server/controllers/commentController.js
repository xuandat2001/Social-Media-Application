const commentModel = require('../models/commentModel.js');
const { matchedData, validationResult } = require('express-validator');

const getAllComments = async (req, res) => {
    const { query: { filter, value } } = req;
        let query = {};
        if (filter && value) {
            query[filter] = { $regex: value, $options: 'i' }; //Case-insensitive search
        }
        const Comments = await commentModel.find(query);
        res.send(Comments);
};
const getOneComment =  async(req, res) => {
    const { findComment } = req;
    if (!findComment) {
        return res.status(400).send({ msg: "post Not Found" });
    }
    res.send(findComment);
};
const createNewComment = async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ errors: result.array() });
    const data = matchedData(req);
    const newComments = new commentModel(data);
    const savedComments = await newComments.save();
    res.status(201).send(savedComments);
};
const editComment = async(req, res) => {
    const { body, findComment } = req;
    Object.assign(findComment, body);
    await findComment.save();
    return res.sendStatus(200);
};
const  deleteComment = async (req, res) => {
    const { findComment } = req;
    await findComment.deleteOne(); 
    return res.sendStatus(200);
};

module.exports = {getAllComments,getOneComment,createNewComment,editComment,deleteComment};
