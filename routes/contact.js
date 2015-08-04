var express = require('express');
var contact = express.Router();

contact.get('/', function(req,res){
  var attr = {
    pageTitle : 'contact'
  };

  res.render('templates/contact',attr);
});

contact.post('/email', function(req,res){
  console.log(req.body);
  res.send('yes');
});

module.exports = contact;
