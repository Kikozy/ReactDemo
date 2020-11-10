const express = require("express")
const { send } = require("process")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-Parser")
const cors = require('cors');
let app = express()

app.use(cors());
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
 // app.use(allowCrossDomain);//运用跨域的中间件

app.get("/",(req,res)=>{
    console.log(req.url)
    res.send("giao")
})

app.get("/login/one",(req,res)=>{
    console.log("one")
    res.send("one")
})
//动态路由
app.get("/login/:id",(req,res)=>{
    res.send(`动态路由${req.params["id"]} 用户: ${req.query.user}密码: ${req.query.pass}`)
    console.log("动态路由")
})
//[使用post中间件]接受form表单传递的数据
app.use(bodyParser.urlencoded({extended: false}))
//[使用post中间件]接受json数据
app.use(bodyParser.json())
//[使用cookie中间件]
// app.use(cookieParser())

app.post("/login",(req,res)=>{
    console.log(req.body)
    res.send(req.body)
})

app.listen(8848)
console.log("server runing... port: 8848")