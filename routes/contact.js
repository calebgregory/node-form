var express = require('express');
var contact = express.Router();
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');

contact.get('/', function(req,res){
  var attr = {
    pageTitle : 'contact'
  };

  res.render('templates/contact',attr);
});

contact.post('/email', function(req,res){
  var d = req.body,
      transporter = nodemailer.createTransport(directTransport());
  transporter.sendMail({
    from    : d.email,
    to      : 'fuzzydicetroll666@gmail.com',
    subject : 'message from ['+ d.name+ ']',
    text    : 'from: ['+ d.name+ '] <'+ d.email+ '>\n'+
              'message: '+ d.message
  },function(err,info) {
    if (err) {
      console.log(err);
      res.send('email didn\'t send');
    } else {
      res.send('thanks for the email!');
    }
  });
});

module.exports = contact;
