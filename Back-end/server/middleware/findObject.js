const userModel = require('../models/userModel.js'); 
const groupModel = require('../models/groupModel.js'); 
const postModel = require('../models/postModel.js');
const notificationModel = require('../models/notificationModel.js');
const commentModel = require('../models/commentModel.js');
const memberShipModel = require('../models/membershipModel.js')

const findById = (model, key) => {
    return async (req, res, next) => {
        const { params: { id } } = req;
        try {
            const document = await model.findById(id);
            if (!document) {
                return res.sendStatus(404);
            }
            req[key] = document;
            next();
        } catch (error) {
            res.status(500).send({ error: 'Server Error' });
        }
    };
};

const findUserById = findById(userModel, 'findUser');
const findGroupById = findById(groupModel, 'findGroup');
const findPostById = findById(postModel, 'findPost');
const findNotificationById = findById(notificationModel, 'findNotification');
const findCommentById = findById(commentModel, 'findComment');
const findMemberShipById = findById(memberShipModel, 'findMemberShip');
module.exports = { findUserById, findGroupById, findPostById,findNotificationById,findCommentById,findMemberShipById };
