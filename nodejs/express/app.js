const express = require("express")
const bodyParser = require("body-Parser")
const cors = require("cors")
const cookieParser = require("cookie-Parser")

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
  app.post("/login",(req,res)=>{
      console.log("有用户尝试登录")
        if(req.body.data.user == "DiaoCan" && req.body.data.pass == "123"){
            //通过 设置cookie
            res.cookie("namae",req.body.data.user,{
                maxAge: 1000*30,
                signed: true,
                path: "/"
            })
            return res.send({resultCode: 200, resultMsg: '登录成功'})
        }else{
            return res.send({resultCode: 400, resultMsg: '登陆失败'})
        }
})
  app.get("/",(req,res)=>{
    if(!req.signedCookies['namae']){
        //没有内容
        res.send("请登录")
    }else{
        res.send("欢迎你"+req.signedCookies["namae"])
    }
  })
  app.get("/page2",(req,res)=>{
    if(!req.signedCookies['namae']){
        //没有内容
        res.send("请登录")
    }else{
        res.send("欢迎你")
    }
  })

app.listen(3000)
console.log("runing port: 8848")
