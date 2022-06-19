const { Router } = require('express')
const express = require('express')
const router = express.Router()

// http://expressjs.com/en/starter/basic-routing.html
router.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

router.get("/api/whoami", function (req, res) {

    let ip = req.socket.remoteAddress;
    let language = req.headers["accept-language"];
    let software = req.headers["user-agent"];

    console.log(req.headers)

    res.json({
        "ipaddress": ip,
        "language": language,
        "software": software
    });
});

module.exports = router;