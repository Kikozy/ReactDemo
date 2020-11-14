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
  app.post("/api/tasksList",(req,res)=>{
    console.log(moment(new Date().valueOf()).format("'YYYY-MM-DD HH:mm:ss'"))
    connection.query("select * from tasks",function(err,data,fields){
      if(err)
      {
        throw err
      }else{
        return res.send((data))
      }
    })
  })
app.listen(8848,()=>{
  console.log("runing port: 8848")
})
