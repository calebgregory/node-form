var express = require('express');
var about = express.Router();

about.get('/', function(req,res){
  res.redirect('https://en.wikipedia.org/wiki/Email_spam')
});

module.exports = about;
