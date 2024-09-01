const userModel = require('../models/userModel.js'); 

const findUserById = async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const findUser = await userModel.findById(id);
        if (!findUser) {
            return res.sendStatus(404); 
        }
        req.findUser = findUser; 
        next();
    } catch (error) {
        res.status(500).send({ error: 'Server Error' });
    }
};

module.exports = { findUserById };