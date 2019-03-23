require('dotenv').config()
var createError = require('http-errors');
const cors = require('cors');
var express = require('express');
const session = require('express-session');
// makes sending requests easy
const request = require('request');
// node core module, construct query string
const qs = require('querystring');
// node core module, parses url string into components
const url = require('url');
// generates a random string
const randomString = require('randomstring');
// random string, will be used in the workflow later
const csrfString = randomString.generate();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const http = require('http');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeAwayRouter = require('./routes/homeaway');
let oAuthRouter = require('./routes/oAuth');

var app = express();


app.use(cors());
app.options('*', cors());
// app.options('*', cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/sharespace', { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

//Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/homeaway', homeAwayRouter);
app.use('/oAuth', oAuthRouter);


//Catch all other routes and return the index file.
//Catch-all route MUST come after all other API routes have been defined.

// NOTE: Concurrently is currently serving Angular through Express app for development.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/sharespace', 'index.html'));
// });

// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

app.use(
  session({
    secret: randomString.generate(),
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

//Redirects user to HomeAway for Authentication
app.get('/login', (req, res, next) => {
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


// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port, () => console.log(`API running on localhost: ${port}`));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
