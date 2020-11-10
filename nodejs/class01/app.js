let fs = require('fs')
fs.stat('./app.js',(error,data)=>{
    if(error){
        console.log(error)
        return
    }
    console.log(data.is())
})