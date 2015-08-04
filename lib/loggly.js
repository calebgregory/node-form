var loggly = require('loggly');

function logger(tag) {
  var client = loggly.createClient({
    token     : '629cac3d-b0e1-4921-a4b0-2359b89b08f6',
    subdomain : 'calebgregory',
    tags      : ['mailer', tag],
    json      : true
  });

  return client;
};

module.exports = logger;
