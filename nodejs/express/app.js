const express = require("express")
const moment = require("moment")
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mysql = require("mysql")
let connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "test"
})
connection.connect()
const app = express()
//使用跨域
app.use(cors())
//使用cookie 传入一个加密的密钥？
app.use(cookieParser("DiaoCan"))
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
  app.post("/api/tasksList/soon",(req,res)=>{
    /*
    请求数据:
      - 查询即将到来的任务
    */
    let nowTime = moment(new Date().valueOf()).format("'HH:mm:ss'")
    let soonSql = `select * from tasks where tasks_day_tick_time>${nowTime}`
    //console.log(moment(new Date().valueOf()).format("'YYYY-MM-DD HH:mm:ss'"))
    connection.query(soonSql,(err,data,fields)=>{
      if(err) throw err
      else{
        return res.send(data)
      }
    })
  })
  app.post("/api/tasksList/miss",(req,res)=>{
    /*
    请求数据:
      - 查询已经过期的任务
    */
    let nowTime = moment(new Date().valueOf()).format("'HH:mm:ss'")
    let missSql = `select * from tasks where tasks_day_tick_time<${nowTime}`
    //console.log(moment(new Date().valueOf()).format("'YYYY-MM-DD HH:mm:ss'"))
    connection.query(missSql,(err,data,fields)=>{
      if(err) throw err
      else{
        return res.send(data)
      }
    })
  })

app.listen(8848,()=>{
  console.log("runing port: 8848")
})
