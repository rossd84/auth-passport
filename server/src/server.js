const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
const routes = require('./routes');
const cors = require('cors')

const app = express();

require('./config/database');
require('dotenv').config();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SECRET_SESSION_KEY, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
// app.use(cors({
//   origin: "http://127.0.0.1:5173/",
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));

// Routes
app.use(routes)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
