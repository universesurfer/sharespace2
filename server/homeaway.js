'use strict';
require('dotenv').config({path: '../.env'})
let https = require('https')
const axios = require('axios')


const token = process.env.ACCESS_TOKEN;  //HomeAway token from .env

let searchURL = 'https://ws.homeaway.com/public/search'



var options = {
  method: 'GET',
  headers: {'Authorization': 'Bearer ' + token },
  dataType: 'json'
};

var params = {
  availabilityStart: '',
  availabilityEnd: '',
  minSleeps: '',
  centerPointLatitude: '',
  centerPointLongitude: '',
  distanceInKm: ''
  // centerPointLatitude + Longitude uses a proximity search to limit results to listings located within a max distance from a specific location, must be sent with centerPointLatitude and centerPointLongitude

}

function search() {
  console.log('token', token)

  axios.get(searchURL, options)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });

}

search()




// searchHomes(options, function(err, result) {
//   if(err) {
//     return console.log('An error occurred while making api request to search homes');
//   }
//   else {
//     console.log(result);
//   }
// });
