var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const https = require('https');
const fs = require('fs');
var app = express();

// config env
require('dotenv').config()

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var studentsRouter = require('./routes/student');
var teachersRouter = require('./routes/teacher');
var dashboardRouter = require('./routes/dashboard');
var classesRouter = require('./routes/class');
var reportRouter = require('./routes/rollcallreport');


// Config Swagger
const expressSwagger = require('express-swagger-generator')(app);
const swaggerConf = require('./swagger-conf.js');
expressSwagger(swaggerConf);
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');





// database
require('./db/db')




app.use(cors({credentials: "true", origin: 'http://localhost:3000'}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Router
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/students', studentsRouter);
app.use('/api/classes', classesRouter);
app.use('/api/teachers', teachersRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/reports', reportRouter);


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

var MODE = process.env.MODE || 'Dev';
if(MODE === 'Prod'){
  app.listen(process.env.DEPLOY_PORT);
}

console.log('Server started successfully!')