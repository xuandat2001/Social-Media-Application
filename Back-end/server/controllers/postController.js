const postModel = require('../models/postModel.js');
const { matchedData, validationResult } = require('express-validator');

const getAllPosts = async (req, res) => {
    const { query: { filter, value } } = req;
        let query = {};
        if (filter && value) {
            query[filter] = { $regex: value, $options: 'i' }; //Case-insensitive search
        }
        const Posts = await postModel.find(query);
        res.send(Posts);
};
const getOnePost =  async(req, res) => {
    const { findPost } = req;
    if (!findPost) {
        return res.status(400).send({ msg: "post Not Found" });
    }
    res.send(findPost);
};
const createNewPost = async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ errors: result.array() });
    const data = matchedData(req);
    const newPosts = new postModel(data);
    const savedPosts = await newPosts.save();
    res.status(201).send(savedPosts);
};
const editPost = async(req, res) => {
    const { body, findPost } = req;
    Object.assign(findPost, body);
    await findPost.save();
    return res.sendStatus(200);
};
const  deletePost = async (req, res) => {
    const { findPost } = req;
    await findPost.deleteOne(); 
    return res.sendStatus(200);
};

module.exports = {getAllPosts,getOnePost,createNewPost,editPost,deletePost};
