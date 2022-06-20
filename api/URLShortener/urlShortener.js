
const express = require('express');
const dns = require('dns');
const bodyParser = require("body-parser"); //need for post
var validator = require('validator');

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: "false" })); //body for post
router.use(bodyParser.json());

let listURL = ['https://freeCodeCamp.org', 'https://forum.freecodecamp.org/', 'https://www.google.com'];

router.use('/public', express.static(`${__dirname}/public`));

router.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint
router.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

router.post('/api/shorturl', (req, res) => { //recieve sent post  

  let URLRequest = req.body.url;

  if (!validator.isURL(URLRequest, {
    require_protocol: true
  })) {
    res.json({
      "error": "Invalid URL"
    })
    return
  }

  dns.lookup(URLRequest.replace(/^http(s{0,1}):\/\/(www\.){0,1}/, ''), (err, addresses) => {

    console.log(err)

    if (err && err.code === 'ENOTFOUND') {
      res.json({
        "error": 'Invalid Hostname'
      })

    } else {
      if (!listURL.includes(URLRequest)) {
        listURL.push(URLRequest)
      }

      res.json({
        "original_url": URLRequest,
        "short_url": listURL.indexOf(URLRequest) + 1
      })
    }
  })
})

router.get('/api/shorturl/:index', function (req, res) {

  let index = req.params.index;

  if (isNaN(index) || index > listURL.length || index <= 0) {
    res.json({
      "error": "No short URL found for the given input"
    })
    return
  }

  res.redirect(listURL[index - 1]);

})

module.exports = router
