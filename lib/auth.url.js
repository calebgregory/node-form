var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost:3000'
);

var scope = 'https://www.googleapis.com/auth/gmail.readonly';

var url = oauth2Client.generateAuthUrl({
  access_type : 'offline',
  scope       : scope
});

module.exports = url;
