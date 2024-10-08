const express = require('express');
const multer = require('multer');
const { getAllPosts, getOnePost, createNewPost, editPost, deletePost, sharePost,getPostsByUser,reportPost,getReportedPost } = require('../controllers/postController.js');
const { findPostById } = require('../middleware/findObject.js');
const postRouter = express.Router();
const upload = multer({ dest: 'uploads/' });
postRouter.get('/api/posts/user/:userId', getPostsByUser );
postRouter.get('/api/posts', getAllPosts);
postRouter.get('/api/posts/:id', findPostById, getOnePost);
postRouter.post('/api/posts',upload.single('imageHash'),createNewPost);
postRouter.put('/api/posts/:id', upload.single('imageHash'), findPostById, editPost);
postRouter.delete('/reported-posts/:id', findPostById, deletePost);
postRouter.post('/report-post/:postId', reportPost);
postRouter.get('/reported-posts', getReportedPost);
module.exports = { postRouter };