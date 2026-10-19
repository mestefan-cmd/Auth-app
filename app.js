/* eslint-disable no-undef */
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/db');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({       
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/userRoutes'));

sequelize.sync().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log('Running on http://localhost:' + port));
}).catch(err => console.log('DB error:', err.message));
