'use strict';
require('dotenv').config({path: '../.env'})
let express = require('express');
let router = express.Router();
let https = require('https')
const axios = require('axios')
var mongoose = require('mongoose');

const token = process.env.ACCESS_TOKEN;  //HomeAway token from .env

let header = {'Authorization': 'Bearer ' + token }

let searchURL = 'https://ws.homeaway.com/public/search'
let listingURL = 'https://ws.homeaway.com/public/listing'

// NOTE: Add error handling to requests

//searchListings route matches the route we specify in our service method.
//Our Angular routes should not match our Node routes.  Please see how the routes differ.
router.get('/searchListings', (req,res,next)  => {

    let params = {
      availabilityStart: req.query.availabilityStart,
      availabilityEnd: req.query.availabilityEnd,
      minSleeps: req.query.minSleeps,
      centerPointLatitude: req.query.centerPointLatitude,
      centerPointLongitude: req.query.centerPointLongitude,
      distanceInKm: req.query.distanceInKm,
      imageSize: req.query.imageSize
      // centerPointLatitude + Longitude uses a proximity search to limit results to listings located within a max distance from a specific location, must be sent with centerPointLatitude and centerPointLongitude
    }

    let config = {
      headers: header,
      params: params
    }

    axios.get(searchURL, config)
      .then(function (response) {
        console.log('Successful HomeAway search in server /search', response);
        res.send(response.data); //Send data
      })
      .catch(function (error) {
        console.log(error);
      })
      // .then(function () {
      //   // always executed
      // });

  });

  router.get('/rentalDetails', (req, res, next) => {

      console.log("getting params in route?", req.query.listingId)

      let params = {
        id: req.query.listingId
      }

      let config = {
        headers: header,
        params: params
      }

      axios.get(listingURL, config)
        .then(function (response) {
          console.log('Getting single rental details', response);
          res.send(response.data); //Send data
        })
        .catch(function (error) {
          console.log(error);
        })

  });










module.exports = router;
