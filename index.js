const express = require('express');
const connectDB = require('./src/db/db');
const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 5000 ;
app.use(bodyParser.json())

app.get('/', (req, res) =>{
    res.send({message:"Welcome to MM Fashion World Server"})
})

const adminRoutes = require("./src/routers/AdminRoutes.js")
const sellerRouters = require("./src/routers/SellerRoutes.js");
const authRouters = require('./src/routers/AuthRoutes.js')


app.use("/sellers", sellerRouters)
app.use('/admin', adminRoutes)
app.use('/auth', authRouters )

app.listen(port, async()=>{
    console.log(`server is runnig on port ${port}`);
    await connectDB()
    
})
