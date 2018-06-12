// main starting point of the application

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose');

// db Setup
// mongoose.connect('mongodb://localhost:auth/auth'); // original command -- return an error
mongoose.connect('mongodb://localhost/auth');

const app = express();

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`server listening on: ${port}`);