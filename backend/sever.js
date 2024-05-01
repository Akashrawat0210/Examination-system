const express = require('express')

const app = express()


app.get('/', (req, res)=>{
    res.json({massage: " Hello from server"})
})



app.listen(5000, ()=>{
    console.log("server started at port 5000")
})