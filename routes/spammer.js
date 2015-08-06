var express = require('express');
var spammer = express.Router();
var request = require('request');
var path = require('path');
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');

spammer.get('/', function(req,res){
  var attr = {
    pageTitle : 'da spammer'
  };

  res.render('templates/spammer',attr);
});

spammer.post('/email', function(req,res){
  var d = req.body,
      generator = require('xoauth2').createXOAuth2Generator({
    user        : 'fuzzydicetroll666@gmail.com',
    clientId    : process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken : process.env.ACCESS_TOKEN
  });

  generator.on('token', function(token) {
    console.log('new token for %s: %s',token.user,token.accessToken);
  });

  var transporter = nodemailer.createTransport(({
    service : 'gmail',
    auth    : {
      xoauth2 : generator
    }
  }));

  var mailOptions = {
    from    : d.email,
    to      : 'fuzzydicetroll666@gmail.com',
    subject : 'message from ['+ d.name+ ']',
    text    : 'from: ['+ d.name+ '] <'+ d.email+ '>\n'+
              'message: '+ d.message
  };

  transporter.sendMail(mailOptions, function(err,response) {
    if (err) {
      console.log(err);
      res.send('email didn\'t send');
    } else {
      console.log(response);
      var url = require(path.join(process.cwd(),'/lib/auth.url'));
      request(url, function(err,xhr,body) {
        res.send(body);
      });
    }
  });
});

module.exports = spammer;
