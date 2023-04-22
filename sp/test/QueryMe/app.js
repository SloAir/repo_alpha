const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('dotenv').config();

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoutes');
const addressRouter = require('./routes/addressRoutes');
const queryRouter = require('./routes/queryRoutes');
const spacesRouter = require('./routes/spaceRoutes');
const answerRouter = require('./routes/answerRoutes');

// DB connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO: create a config file
  app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
    })
  );

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/spaces', spacesRouter);

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
module.exports.handlebars = hbs;
