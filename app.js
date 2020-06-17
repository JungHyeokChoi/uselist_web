var express = require('express')
var path = require('path')
var bodyParser = require('body-parser');
var app = express()

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.get('/hello', (req, res) => {
    console.log("Hello World")
    console.log(req.body)
    res.render('hello.ejs')
})

var port = 8080
app.listen(port, (req, res) => {
    console.log(`server is Running at http://localhost:8080`)
});
