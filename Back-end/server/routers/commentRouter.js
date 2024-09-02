const express = require('express');
const { getAllComments,getOneComment,createNewComment,editComment,deleteComment } = require('../controllers/commentController.js');
const { checkSchema } = require('express-validator');
const { createCommentValidationSchema  } = require('../validation/validationSchema.js');
const { findCommentById } = require('../middleware/findObject.js');
const commentRouter = express.Router();

commentRouter.get('/api/comments', getAllComments);
commentRouter.get('/api/comments/:id', findCommentById, getOneComment);
commentRouter.post('/api/comments', checkSchema(createCommentValidationSchema), createNewComment);
commentRouter.put('/api/comments/:id', findCommentById, editComment);
commentRouter.delete('/api/comments/:id', findCommentById, deleteComment );

module.exports = { commentRouter };