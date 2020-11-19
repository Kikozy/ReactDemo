const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: "test"
})
connection.connect()
const app = express()
//使用跨域
app.use(cors())
//使用post
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
app.post("/api/TaskList",(req,res)=>{
    let SQL = `SELECT * FROM task where complete=0`
    connection.query(SQL,(err,data)=>{
        if(err) throw err
        return res.json(data)
    })
})
app.post("/api/AddTask",(req,res)=>{
    let SQL = `INSERT INTO task VALUES ("${req.body.name}","${req.body.info}",${req.body.complete})`
    connection.query(SQL,(err,data)=>{
        if(err) throw err
        return res.send("ok")
    })
})
app.post("/api/DelTask",(req,res)=>{
    let SQL = `DELETE FROM task WHERE name = "${req.body.name}" AND info = "${req.body.info}"`
    connection.query(SQL,(err,data)=>{
        if(err) throw err
        return res.send("ok")
    })
})
app.post("/api/EditTask",(req,res)=>{
    let SQL = `UPDATE task SET name = "${req.body.name}",info="${req.body.info}" WHERE name="${req.body.oldData.name}" AND info="${req.body.oldData.info}" `
    connection.query(SQL,(err,data)=>{
        if(err) throw err
        return res.send("ok")
    })
})
app.post("/api/Complete",(req,res)=>{
    let SQL = `UPDATE task SET complete = 1 WHERE name="${req.body.name}" AND info="${req.body.info}" `
    connection.query(SQL,(err,data)=>{
        if(err) throw err
        return res.send("ok")
    })
})
app.post("/api/TaskList/Complete",(req,res)=>{
    let SQL = `SELECT * FROM task where complete=1`
    connection.query(SQL,(err,data)=>{
        if(err) throw err
        return res.json(data)
    })
})
app.listen(8848,()=>{
  console.log("runing port: 8848")
})
