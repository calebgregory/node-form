var express = require('express');
var contact = express.Router();
var nodemailer = require('nodemailer');

contact.get('/', function(req,res){
  var attr = {
    pageTitle : 'contact'
  };

  res.render('templates/contact',attr);
});

contact.post('/email', function(req,res){
  var d = req.body,
      transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
      user : 'fuzzydicetroll666@gmail.com',
      pass : '[password]'
    }
  });
  transporter.sendMail({
    from    : d.email,
    to      : 'fuzzydicetroll666@gmail.com',
    subject : 'message from ['+ d.name+ ']',
    text    : 'from: ['+ d.name+ '] <'+ d.email+ '>\n'+
              'message: '+ d.message
  });
  res.send('thanks for the email!');
});

module.exports = contact;
