const timestamp = require('./api/Timestamp/timestamp');
const reqHeader = require('./api/RequestHeader/reqHeader');
const urlShortener = require('./api/URLShortener/urlShortener')

// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(54375, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.use('/timestamp', timestamp);
app.use('/req-header', reqHeader);
app.use('/url-shortener', urlShortener);