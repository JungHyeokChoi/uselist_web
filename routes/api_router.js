var express = require('express')
var mysql = require('mysql')
var router = express.Router()

var sql_config = {
    host : "localhost",
    user : "root",
    password : "1234",
    database : "o2"
}

var db = mysql.createConnection(sql_config)

router.get('/topic/add', (req, res) => {

    var sql = "SELECT * FROM topic"
    db.query(sql, (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send("internal Server Error")
        }
        console.log(result)
        res.render('add', {topics:result})
    })
})

router.post('/topic/add', (req, res) => {
    var sql = `INSERT INTO topic (title, description, author) VALUES (?, ?, ?)`;
    var queryData = [req.body.title, req.body.description, req.body.author]
    db.query(sql , queryData, (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send("internal Server Error")
        }
        console.log(result)
        res.redirect('/topic/add')
    })
    res.send("Success")
    console.log(req.body)
})

router.get('/hello', (req, res) => {
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

router.get('/data', (req, res) =>{
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

module.exports = router;

