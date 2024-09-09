const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userModel = require('./models/userModel.js');
const cors = require('cors');
const {mainRouter} = require('./routers/mainRouter.js');

const app = express();
//initiliaze session and cookie
app.use(   
  session({
      secret : "social-application",
      saveUninitialized: false,
      resave:false,
      cookie :{
          maxAge: 60000 * 60,
      }
  })
);

// Middleware setup
app.use(express.json());  // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded form data
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allow credentials (cookies, sessions)
}));




app.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const findUser = await userModel.findOne({ userName });
    if (!findUser || !(await bcrypt.compare(password, findUser.password))) {
      return res.status(401).send({ msg: 'Bad Credentials' });
    }

    // Regenerate the session to assign a new session ID
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).send({ msg: 'Session regeneration failed' });
      }

      req.session.user = findUser; // Store user in session
      return res.status(200).send({
        msg: 'Login successful',
        findUser: {
          id: findUser._id,
          userName: findUser.userName,
          fullName: findUser.fullName,
          userAvatar: findUser.userAvatar,
        },
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).send({ msg: 'Internal Server Error' });
  }
});


  
app.use(mainRouter);
const checkSession = (req, res, next) => {
  if (req.session.user) {
      console.log('User found in session:', req.session.user);
      next(); // User is found, proceed to the next middleware or route handler
  } else {
      console.log('No user in session');
      res.status(401).send('Unauthorized'); // No user found, return unauthorized response
  }
};

// Example route protected by the session check
app.get('/protected-route', checkSession, (req, res) => {
  res.send('This is a protected route');
});
// MongoDB connection URL
const CONNECTION_URL = 'mongodb+srv://AeRMITNo1:v2DUKnapXCtwNIxA@socialmediaapplinkbridg.g4vbw.mongodb.net/FullStackRMIT'
const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start the server
mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));





