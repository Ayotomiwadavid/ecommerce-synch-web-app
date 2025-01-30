const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

//App Port
const port = process.env.port || 8000;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    console.log('Welcome home');
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
})