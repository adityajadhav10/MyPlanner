var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors= require('cors');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');


const config = require('./config/database');
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

let db = mongoose.connection;
const PORT = process.env.PORT || 3000;

db.once('open',  ()  => {
  console.log('Connected to MongoDB');
});

//Checking for errors;
db.on('error', (err)  => {
  console.log(err);
});

var app = express();

app.use(cors());

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/index.html')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Validation
var expressValidator = require('express-validator');
app.use(expressValidator());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next)  => {
  next(createError(404));
});

// Add headers
app.use((req, res, next) => {  
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Accept, X-Access-Token, X-Key, Authorization');

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));

module.exports = app;
