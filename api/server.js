const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require("express-session");

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfiguration = {
  name: "ohfosho", //default would be "sid"
  secret: "keep it secret, keep it safe", // <-- use environment variable for this!!!
  cookie: {
    httpOnly: false, //JS cannot access the cookies
    maxAge: 1000 * 60 * 60, //expiration time in milliseconds
    // secure: process.env.NODE_ENV === production ? true : false;
    secure: false //should be true in production
  }, 
  resave: false,
  saveUninitialized: false, //read about GDPR compliance
}

server.use(sessions(sessionConfiguration));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
