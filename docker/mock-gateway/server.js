const express = require('express')

const app = express()

app.get('/authorize',(req,res)=>{

 res.json({
  authorized:true
 })

})

app.listen(4000,()=>{
 console.log("mock gateway running")
})