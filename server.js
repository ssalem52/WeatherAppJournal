// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//Here we are configuring express to use body-parser as middle-ware.

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };
//GET Route
app.get('/projectData', sendData);

function sendData (request, response) {
  response.send(projectData);
};

app.post('/addWeatherData', addData);

function addData(req, res){
  projectData["temp"] = req.body.temp;
  projectData["date"] = req.body.date;
  projectData["feelings"] = req.body.feelings;
}
