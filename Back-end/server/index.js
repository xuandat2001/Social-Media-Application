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
  origin: 'http://localhost:5173'
}));
app.post('/login', async (req, res) => {
  const { body: { userName, password } } = req;
  try {
    const findUser = await userModel.findOne({ userName });
    if (!findUser ||  !(await bcrypt.compare(password, findUser.password))) {
      return res.status(401).send({ msg: "Bad Credentials" });
    }
    req.session.user = findUser;
    return res.status(200).send({ msg: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
});

  
app.use(mainRouter);
// MongoDB connection URL
const CONNECTION_URL = 'mongodb+srv://AeRMITNo1:v2DUKnapXCtwNIxA@socialmediaapplinkbridg.g4vbw.mongodb.net/FullStackRMIT'
const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start the server
mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));





