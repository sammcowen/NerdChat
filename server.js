const bcrypt = require('bcrypt');
const express = require('express');
const exphbs = require('express-handlebars');
const opath = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

// const sequelize = require()



