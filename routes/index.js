var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
  var attr = {
    pageTitle : 'home'
  };

  res.render('templates/index',attr);
});

module.exports = router;
