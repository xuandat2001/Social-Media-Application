const express = require('express');
const multer = require('multer');
const { getAllPosts, getOnePost, createNewPost, editPost, deletePost, sharePost } = require('../controllers/postController.js');
const { findPostById } = require('../middleware/findObject.js');
const postRouter = express.Router();
const upload = multer({ dest: 'uploads/' });
postRouter.get('/api/posts', getAllPosts);
postRouter.get('/api/posts/:id', findPostById, getOnePost);
postRouter.post('/api/posts',upload.single('imageHash'),createNewPost);
postRouter.put('/api/posts/:id', upload.single('imageHash'), findPostById, editPost);
postRouter.delete('/api/posts/:id', findPostById, deletePost);
// postRouter.post('/api/posts/share', sharePost);


module.exports = { postRouter };