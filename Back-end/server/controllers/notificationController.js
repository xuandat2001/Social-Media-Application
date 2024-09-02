const notificationModel = require('../models/notificationModel.js');
const { matchedData, validationResult } = require('express-validator');

const getAllNotifications = async (req, res) => {
    const { query: { filter, value } } = req;
        let query = {};
        if (filter && value) {
            query[filter] = { $regex: value, $options: 'i' }; //Case-insensitive search
        }
        const Notifications = await notificationModel.find(query);
        res.send(Notifications);
};
const getOneNotification =  async(req, res) => {
    const { findNotification } = req;
    if (!findNotification) {
        return res.status(400).send({ msg: "post Not Found" });
    }
    res.send(findNotification);
};
const createNewNotification = async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ errors: result.array() });
    const data = matchedData(req);
    const newNotification = new notificationModel(data);
    const savedNotification = await newNotification.save();
    res.status(201).send(savedNotification);
};
const editNotification = async(req, res) => {
    const { body, findNotification } = req;
    Object.assign(findNotification, body);
    await findNotification.save();
    return res.sendStatus(200);
};
const  deleteNotification = async (req, res) => {
    const { findNotification } = req;
    await findNotification.deleteOne(); 
    return res.sendStatus(200);
};

module.exports = {getAllNotifications,getOneNotification,createNewNotification,editNotification,deleteNotification};
