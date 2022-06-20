
const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

// http://expressjs.com/en/starter/basic-routing.html
router.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });

router.get('/api/:date', function (req, res) { // date: 2022-06-16
    let date = new Date(req.params.date) // try to create date.object 

    if (isNaN(date.getTime())) { // if data is invalid in was timestamp
      date = new Date(+req.params.date) // transform to number and create date.object
    }
    console.log(date)
    
    let GMTdate = date.toGMTString();
      console.log(GMTdate)  // "utc": "Thu, 16 Jun 2022 00:00:00 GMT"

    if (GMTdate === 'Invalid Date'){
      res.json({
        "error": 'Invalid Date'
      });
      return
    }
    
    let timestamp = date.getTime()
      console.log(timestamp) // "unix": 1655337600000,

    res.json({
      "unix": timestamp,
      "utc": GMTdate
    })
  })

router.get('/api/', function(req, res) {
  let date = new Date();

  let GMTdate = date.toGMTString();
    console.log(GMTdate)

  let timestamp = date.getTime()
    
  res.json({
    "unix": timestamp,
    "utc": GMTdate
  })
})

module.exports = router