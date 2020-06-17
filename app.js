var express = require('express')
var path = require('path')
var app = express()
var apiRouter = require('./routes/api_router.js')

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use( '/', apiRouter)

var port = 8080
app.listen(port, (req, res) => {
    console.log(`server is Running at http://localhost:${port}`)
});
