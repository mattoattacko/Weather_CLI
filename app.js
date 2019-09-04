// Our weather module has all the code we need to get the weather based on a query 
const weather = require('./weather');

// Join multiple values passed as arguments and replace all spaces with underscores
// This cleans up the user input to create queries for the API

// This works for WeatherUnderground
// const query = process.argv.slice(2).join("_").replace('','_');

// This works for OpenWeatherAPI
const query = process.argv.slice(2).join(' ');

// query: 96825
// query: Honolulu_HI
// query: Honolulu, Hawaii

// passes the query into the weather modules get function
weather.get(query);