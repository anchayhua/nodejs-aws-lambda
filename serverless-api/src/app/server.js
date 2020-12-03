const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const morgan = require('morgan');

//require('./config/database');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(morgan('dev'));

app.use('/general', require('./route/generalRoute'));
app.use('/swapi', require('./route/swapiRoute'));

module.exports = app