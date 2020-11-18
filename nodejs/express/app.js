const express = require("express")
const moment = require("moment")
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")
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
    - 排序功能
  */
  let nowTime = moment(new Date().valueOf()).format("'HH:mm:ss'")
  let soonSql = `SELECT * from tasks WHERE tasks_day_tick_time>${nowTime}`
  connection.query(soonSql,(err,data)=>{
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
//修改任务运行状态
app.post("/api/tasksEdit/taskRunAndStopState",(req,res)=>{
  let state = req.body.state?0:1
  let editSql = `UPDATE tasks SET tasks_stop = ${state} WHERE tasks_name = "${req.body.name}" AND tasks_master = "${req.body.user}"`
  connection.query(editSql,(err,data)=>{
    if(err) throw err
    else{
      let querySql = `SELECT * from tasks WHERE tasks_name = "${req.body.name}" AND tasks_master = "${req.body.user}"`
      connection.query(querySql,(err,data)=>{
        if(err) throw err
        else{
          return res.send(data)
        }
      })
    }
  })
})
app.post("/api/tasksEdit/taskEdit",(req,res)=>{
  console.log(req.body.tasks_name)
  res.send("请求成功")
})
app.listen(8848,()=>{
  console.log("runing port: 8848")
})
