var express = require('express');
var contact = express.Router();

contact.get('/contact', function(req,res){
  var attr = {
    pageTitle : 'contact'
  };

  res.render('templates/contact',attr);
});

module.exports = contact;
