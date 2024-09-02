const express = require('express');
const { getAllPosts,getOnePost,createNewPost,editPost,deletePost } = require('../controllers/postController.js');
const { checkSchema } = require('express-validator');
const { createPostValidationSchema } = require('../validation/validationSchema.js');
const { findPostById } = require('../middleware/findObject.js');
const postRouter = express.Router();

postRouter.get('/api/posts', getAllPosts);
postRouter.get('/api/posts/:id', findPostById, getOnePost);
postRouter.post('/api/posts',checkSchema(createPostValidationSchema),createNewPost);
postRouter.put('/api/posts/:id', findPostById, editPost);
postRouter.delete('/api/posts/:id', findPostById, deletePost);

module.exports = { postRouter };