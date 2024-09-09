const commentModel = require('../models/commentModel.js');
const { matchedData, validationResult } = require('express-validator');
const { createCommentNotification } = require('../controllers/notificationController');
const postModel = require('../models/postModel.js'); // Import the post model to get the post owner's ID

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
    const { postId, userId, commentText } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ errors: result.array() });

    const data = matchedData(req);
    const newComments = new commentModel(data);
    const savedComments = await newComments.save();
    
    const post = await postModel.findById(postId);
    if (!post) {
        return res.status(404).send({ error: 'Post not found' });
    }
    res.status(201).send(savedComments);
    await createCommentNotification({
        body: { triggered_by: userId, post_id: postId, comment_id: newComments.comment_id}
    }, res);

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
