const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = 3000;
require('dotenv').config();


//connection of frontend with server 
app.use(cors(
    
    {
        origin : 'http://localhost:5173',
    }
));


//connection of mongodatabase with server
mongoose.connect('mongodb+srv://AeRMITNo1:v2DUKnapXCtwNIxA@socialmediaapplinkbridg.g4vbw.mongodb.net/?retryWrites=true&w=majority&appName=SocialMediaAppLinkBridge')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB...', err));



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})