const express = require('express');
const connectDB = require('./src/db/db');

const app = express()
const port = process.env.PORT || 5000 ;

app.get('/', (req, res) =>{
    res.send({message:"Welcome to MM Fashion World Server"})
})

app.listen(port, async()=>{
    console.log(`server is runnig on port ${port}`);
    await connectDB()
    
})
