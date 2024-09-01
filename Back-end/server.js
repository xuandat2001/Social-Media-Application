const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const COOKIE_SECRET = require('./server/cookieSecret');

const PORT = 3000;
require('dotenv').config();
const {userRoutes} = require('./server/routes/users.js');


//connection of frontend with server 
app.use(cors(
    
    {
        origin : 'http://localhost:5173',
    }
));
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));
app.use('/users', userRoutes);


//connection of mongodatabase with server
// mongoose.connect('mongodb+srv://AeRMITNo1:v2DUKnapXCtwNIxA@socialmediaapplinkbridg.g4vbw.mongodb.net/?retryWrites=true&w=majority&appName=SocialMediaAppLinkBridge')
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Could not connect to MongoDB...', err));



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
