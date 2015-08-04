// packages //

var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');


// route templates //

var index = require(path.join(process.cwd(),'/routes/index'));
var about = require(path.join(process.cwd(),'/routes/about'));
var contact = require(path.join(process.cwd(),'/routes/contact'));


// variables //

var app = express();


// settings //

app.set('view engine', 'ejs');


// locals //

app.locals.title = 'email.me';


// middlewares //

app.use(morgan('dev'));

app.use(function(req,res,next){
  var client = require(path.join(process.cwd(),'/lib/loggly'))('incoming');
  client.log({
    date    : new Date().toISOString(),
    ip      : req.ip,
    method  : req.method,
    status  : res.statusCode,
    url     : req.url
  });
  next();
});

app.use(bodyParser.urlencoded({ extended : false }));


// routes //
app.use('/', index);
app.use('/about', about);
app.use('/contact', contact);


// errors //

app.use(function(req,res,next){
  res.status(403).send('Unauthorized');
});

app.use(function(err,req,res,next) {
  var client = require(path.join(process.cwd(),'/lib/loggly'))('error');
  client.log({
    date    : new Date().toISOString(),
    ip      : req.ip,
    method  : req.method,
    status  : res.statusCode,
    url     : req.url,
    error   : err
  });
  res.status(500).send(err);
});

var server = app.listen(3000, function() {

  var port = server.address().port;

  console.log('Simple mailer listening at http://localhost:'+ port);
});
