const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {userRoutes} = require('./routes/users.js');
const {authRoutes} = require('./routes/auth.js');

const app = express();

app.use('/users', userRoutes);
app.use('/auth', authRoutes);


// Middleware setup
app.use(express.json());  // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded form data
app.use(cors());  // Enable CORS

// MongoDB connection URL
const CONNECTION_URL = 'mongodb+srv://AeRMITNo1:v2DUKnapXCtwNIxA@socialmediaapplinkbridg.g4vbw.mongodb.net/FullStackRMIT'
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));





