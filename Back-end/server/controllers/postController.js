const postModel = require('../models/postModel.js');
const fs = require('fs');
const { matchedData, validationResult } = require('express-validator');

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('user', 'userName userAvatar');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};
const getOnePost =  async(req, res) => {
    const { findPost } = req;
    if (!findPost) {
        return res.status(400).send({ msg: "post Not Found" });
    }
    res.send(findPost);
};
const createNewPost = async (req, res) => {
    try {
        const data = req.body;

        // Check if required fields are present
        if (!data.content || !data.user) {
            return res.status(400).json({ msg: "Content and user are required" });
        }

        let imageHash = null;

        // Check if an image was uploaded
        if (req.file) {
            // Read the image file from the temporary location
            imageHash = fs.readFileSync(req.file.path, { encoding: 'base64' }); // Convert image file to Base64
    
            // Remove the file from the temporary folder
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting temporary file:', err);
            });
        }

        // Set default values for optional fields
        const postData = {
            content: data.content,
            numberOfReaction: data.numberOfReaction || 0,
            numberOfComment: data.numberOfComment || 0,
            post_access_right: data.post_access_right || 'public',
            image_url: imageHash,  // Store the image hash in the `image_url` field
            user: data.user
        };

        // Create and save the post
        const newPost = new postModel(postData);
        const savedPost = await newPost.save();

        return res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ msg: "Failed to create post", error: error.message });
    }
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
