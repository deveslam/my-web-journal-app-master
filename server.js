// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');

// Listening port
const port = 8080;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen (port, () => {console.log (`Server is running on: http://localhost:${port}`)});

// Creating /getAll function to get all data
app.get ('/getAll', (request, response) => {
    response.send(projectData).status(200).end();
});

// Posting Data
app.post ('/postingData', (request, response) => {
    projectData = {
        temp: request.body.temp,
        date: request.body.date,
        content: request.body.content
    };
    response.send(projectData).status(404).end();
});
