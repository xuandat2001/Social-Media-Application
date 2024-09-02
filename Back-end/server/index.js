const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {mainRouter} = require('./routers/mainRouter.js');

const app = express();
// initiliaze session and cookie
// app.use(   
//   session({
//       secret : "social-application",
//       saveUninitialized: false,
//       resave:false,
//       cookie :{
//           maxAge: 60000 * 60,
//       }
//   })
// );

// Middleware setup
app.use(express.json());  // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded form data
app.use(cors());  // Enable CORS
app.use(mainRouter);
// MongoDB connection URL
const CONNECTION_URL = 'mongodb+srv://AeRMITNo1:v2DUKnapXCtwNIxA@socialmediaapplinkbridg.g4vbw.mongodb.net/FullStackRMIT'
const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start the server
mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));





