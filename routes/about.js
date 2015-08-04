var express = require('express');
var about = express.Router();

about.get('/about', function(req,res){
  var attr = {
    pageTitle : 'about'
  };

  res.render('templates/about',attr);
});

module.exports = about;
