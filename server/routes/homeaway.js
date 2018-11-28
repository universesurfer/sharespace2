'use strict';
require('dotenv').config({path: '../.env'})
let express = require('express');
let router = express.Router();
let https = require('https')
const axios = require('axios')
var mongoose = require('mongoose');

const token = process.env.ACCESS_TOKEN;  //HomeAway token from .env

let searchURL = 'https://ws.homeaway.com/public/search'

let options = {
  method: 'GET',
  headers: {'Authorization': 'Bearer ' + token },
  dataType: 'json'
};


router.get('/search', (req,res,next)  => {

    let params = {
      availabilityStart: req.query.availabilityStart,
      availabilityEnd: req.query.availabilityEnd,
      minSleeps: req.query.minSleeps,
      centerPointLatitude: req.query.centerPointLatitude,
      centerPointLongitude: req.query.centerPointLongitude,
      distanceInKm: req.query.distanceInKm
      // centerPointLatitude + Longitude uses a proximity search to limit results to listings located within a max distance from a specific location, must be sent with centerPointLatitude and centerPointLongitude
    }

    axios.get(searchURL, options, params)
      .then(function (response) {
        console.log('Successful HomeAway search in server /search', response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });


  });






module.exports = router;
