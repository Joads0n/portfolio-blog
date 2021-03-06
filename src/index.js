require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const { estrategyAuth } = require("./app");

const app = express();

routes(app);

app.listen(3000, () => {
  console.log('SERVER ON');
});

module.exports = app;

