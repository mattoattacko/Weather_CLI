const https = require('https');
const http = require('http');
const api = require('./api.json');
const querystring = require('querystring');


// Print out temprature details
// printWeather takes in a JSON object (weather) returned from the API
function printWeather(weather) {
    const message = `Current temperature in ${weather.name} is ${weather.main.temp}F`;
    console.log(message);
}

// Print out error messages from the error object
function printError(error) {
    console.error(error.message);
}

// Get function that takes in the query from the command line arguments
function get(query) {
    // Using a try/catch statement incase the url is malformed
    try {
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
        // console.log(url);

        const request = https.get(url, response => {
            if (response.statusCode === 200) {
                let body = '';

                // Read the data
                response.on('data', chunk => {
                    body += chunk;
                });
                response.on('end', () => {
                    try {
                        // Parse data
                        const weather = JSON.parse(body);
                        // Print the data
                        printWeather(weather);
                    } catch (error) {
                        // JSON Parse error
                        printError(error);
                    }
                });
            } else {
                // status error code
                const statusErrorCode = new Error(`There was an error getting the message for "${query}". (${http.STATUS_CODES[response.statusCode]})`);
                printError(statusErrorCode);
            }
        });
    } catch (error) {
        // Malformed URL Error
        printError(error);
    }
}

module.exports.get = get;