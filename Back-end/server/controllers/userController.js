const users = require('../routes/users')
const UserModel = require('../models/userModel')

exports.user = async (req, res, next) => {
    res.send('This Work')
}

exports.get = async (req, res, next) => {
    try{
        const users = await UserModel.find();
        console.log(users);
        res.status(200).json(users);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

