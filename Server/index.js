const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb+srv://techthoth02:CyNA3V2FI1p4vevI@cluster0.iy8rc.mongodb.net/test');

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('Database Connection Established');
})

//App Port
const port = process.env.port || 8000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('Welcome home');
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
})