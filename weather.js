const https = require('https');
const api = require('./api.json');
const querystring = require('querystring');

// Print out temprature details
// Print out error messages

// Get function that takes in the query from the command line arguments
function get(query) {
  const parameters = {
    APPID: api.key,
    units: 'imperial'
    // uncomment this to switch from imperial to metric
    // units: 'metric'
  };

  const zipCode = parseInt(query);
  if (!isNaN(zipCode)) {
    parameters.zip = zipCode + ',us';
  } else {
    parameters.q = query + ',us';
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}`;
  
  console.log(url);

  const request = https.get(url, response => {
    let body = "";

    // Read the data
    response.on('data', chunk => {
      body += chunk;
    });
    response.on('end', () => {
      console.log(body);
      // Parse data
      // Print the data
    });

  });
}

module.exports.get = get;

// TODO: handle any errors