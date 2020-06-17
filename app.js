var express = require('express')
var app = express()

var port = 8080
app.listen(port, function (req, res) {
    console.log(`server is Running at http://localhost:8080`)
});
