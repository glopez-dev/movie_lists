const express = require('express');
const app = express();
const sequelize = require('./database.js');

app.use( (req, res, next) => {
  console.log('Request incoming...');
  next();
});

app.use( (req, res, next) => {
  res.json({ message: 'Request received !'});
});

app.use(express.json());

module.exports = app;
