var express = require('express');
var router = express.Router();

const axious = require('axios');

const homeAwayToken = process.env.ACCESS_TOKEN

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



axios.get('https://ws.homeaway.com/public/search/', {
  params: {
    location: '',
    numberOfGuests: '',
    startDate: '',
    endDate: ''
  }
})











module.exports = router;
