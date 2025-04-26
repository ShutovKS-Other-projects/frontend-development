const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/requests.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'requests.json'));
});

module.exports = app;