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
        res.redirect('/topic')
    })
})

router.get('/topic/edit/:id', (req, res) => {
    var ids = req.params.id
    var sql = `SELECT * FROM topic WHERE id = ${ids}`
    db.query(sql, (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send("internal Server Error")
        }
        res.render('edit', {topic : result[0]})
    })
})

router.post('/topic/:id/edit', (req, res) => {
    var id =req.params.id
    var title = req.body.title
    var description = req.body.description
    var author = req.body.author

    var sql = `UPDATE topic SET title=? ,description=? ,author=? WHERE id=${id}`
    var upData = [title, description, author]
    db.query(sql , upData, (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send("internal Server Error")
        }
        res.redirect(`/topic/${id}`)
    })
})

router.get('/topic/:id/delete', (req, res) => {
    var id = req.params.id
    db.query(`SELECT * FROM topic WHERE id=${id}`, (err,results) =>{
        var title = results[0].title
        var description = results[0].description
        var author = results[0].author
        
        var sql_1 = `INSERT INTO deletelist (title, description, author) VALUES(?, ?, ?)`
        var queryData = [title, description, author]
        db.query(sql_1, queryData, (err,result_1) => {
            if(err){
                console.log(err)
                res.status(500).send("internal Server Error")
             }

            var sql = `DELETE FROM topic WHERE id=${id}`
            db.query(sql, (err, result) => {
            if(err){
                console.log(err)
                res.status(500).send("internal Server Error")
             }
            res.redirect(`/topic`)
            })
        })
    })
})

// params(:)
router.get(['/topic','/topic/:id'], (req, res) => {
    var sql = `SELECT * FROM topic`
    db.query(sql, (err,results) => {
        var id = req.params.id
        if(id){
            // 'SELECT * FROM topic WHERE id=?'
            var sql = `SELECT * FROM topic WHERE id=${id}`
            db.query(sql, (err, result) => {
                if(err){
                    console.log(err)
                    res.status(500).send("internal Server Error")
                }

                res.render('view', {
                    topics : results,
                    topic : result[0]
                })
            })
        }
        else{
            res.render('view', {
                topics : results,
                topic : undefined
            })
        }
    })
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

