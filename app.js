var express = require('express')
var path = require('path')
var mysql = require('mysql')
var app = express()

var sql_config = {
    host : "localhost",
    user : "root",
    password : "1234",
    database : "o2"
}

var db = mysql.createConnection(sql_config)

db.connect()

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.get('/hello', (req, res) => {
    console.log("Hello World")
    console.log(req)
    var info = {
        name : "최정혁",
        age : 29,
        address : "Daejoun"
    }
    var sql = "SELECT * FROM topic"
    db.query(sql, (err, result) => {
        if(err){
            console.log(err)
        } else {
            console.log(result[0])
            res.render('hello.ejs',{
                data:info,
                db:result
            })
        }
    })
})

app.get('/data', (req, res) =>{
    var sql = "SELECT * FROM topic"
    db.query(sql, (err, result) => {
        if(err){
            console.log(err)
        } else {
            // console.log(result[0])
            // res.send(`${result[0].author} 수업은 ${result[0].title}`)
            res.render('data.ejs', {db:result})
        }
    })

})

var port = 8080
app.listen(port, (req, res) => {
    console.log(`server is Running at http://localhost:${port}`)
});
