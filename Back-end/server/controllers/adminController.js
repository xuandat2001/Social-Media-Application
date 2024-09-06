const adminModel = require('../models/AdminModel.js');
const bcrypt = require('bcrypt');  // Assuming bcrypt is required for password comparison

const loginAdmin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const findAdmin = await adminModel.findOne({ userName });
    if (!findAdmin || !(await bcrypt.compare(password, findAdmin.password))) {
      return res.status(401).send({ msg: 'Bad Credentials' });
    }

    return res.status(200).send({
      msg: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).send({ msg: 'Internal Server Error' });
  }
};

const createNewAdmin = async (req, res) => {
  const { body } = req;
  const { password } = body;  // Extract the password from the request body

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds for hashing

    // Create a new admin with the hashed password
    const newAdmin = new adminModel({
      ...body,
      password: hashedPassword,  // Save the hashed password
    });

    const savedAdmin = await newAdmin.save();
    return res.status(201).send({ msg: "Create Admin Account Successfully", savedAdmin });
  } catch (error) {
    console.error('Error creating admin:', error);
    return res.status(500).send({ msg: 'Internal Server Error' });
  }
};

module.exports = { loginAdmin, createNewAdmin };
