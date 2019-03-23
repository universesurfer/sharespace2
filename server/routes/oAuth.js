'use strict';
require('dotenv').config({path: '../.env'})
var express = require('express');
var router = express.Router();

const axios = require('axios');


router.get('/redirect', (req, res, next) => {
    // generate that csrf_string for your "state" parameter
  req.session.csrf_string = randomString.generate();
    // construct the HomeAway URL you redirect your user to.
    // qs.stringify is a method that creates foo=bar&bar=baz
    // type of string for you.
  const homeAwayAuthUrl =
    'https://ws.homeaway.com/oauth/authorize?' +
    qs.stringify({
      client_id: process.env.CLIENT_ID,
      // redirect_uri: redirect_uri,
      state: req.session.csrf_string,
      scope: 'user:email'
    });
  // redirect user with express
  res.redirect(homeAwayAuthUrl);
});



module.exports = router;
