var page = require('webpage').create()
  , system = require('system')
  , url;

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

if(system.args.length === 1) {
  console.log('no url was passed to phantomjs command');
  phantom.exit();
}

url = system.args[1];
page.open(url, function() {
  page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js', function() {
    page.evaluate(function() {
      console.log('we got here');
      $('button').click();
    });
  });
  setTimeout(function() {
    phantom.exit();
  },5000);
});
