const express = require('express');
const multer = require('multer');
const { getAllPosts,getOnePost,createNewPost,editPost,deletePost } = require('../controllers/postController.js');
const { findPostById } = require('../middleware/findObject.js');
const postRouter = express.Router();
const upload = multer({ dest: 'uploads/' });
postRouter.get('/api/posts', getAllPosts);
postRouter.get('/api/posts/:id', findPostById, getOnePost);
postRouter.post('/api/posts',upload.single('imageHash'),createNewPost);
postRouter.put('/api/posts/:id', findPostById, editPost);
postRouter.delete('/api/posts/:id', findPostById, deletePost);

module.exports = { postRouter };