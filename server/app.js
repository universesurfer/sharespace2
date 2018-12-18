require('dotenv').config()
var createError = require('http-errors');
const cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const http = require('http');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeAwayRouter = require('./routes/homeaway');

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


//Catch all other routes and return the index file.
//Catch-all route MUST come after all other API routes have been defined.

// NOTE: Concurrently is currently serving Angular through Express app for development.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/sharespace', 'index.html'));
// });

// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

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
