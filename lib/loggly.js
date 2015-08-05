var loggly = require('loggly');

function logger(tag) {
  var client = loggly.createClient({
    token     : process.env.LOGGLY_TOKEN,
    subdomain : 'calebgregory',
    tags      : ['mailer', tag],
    json      : true
  });

  return client;
};

module.exports = logger;
