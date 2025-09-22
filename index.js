const express = require('express');
const connectDB = require('./src/db/db.js');
const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 5000 ;
// app.use(bodyParser.json())
app.use(express.json())

app.get('/', (req, res) =>{
    res.send({message:"Welcome to MM Fashion World Server"})
})

const adminRoutes = require("./src/routers/AdminRoutes.js")
const sellerRouters = require("./src/routers/SellerRoutes.js");
const authRouters = require('./src/routers/AuthRoutes.js')
const userRoutes = require('./src/routers/UserRoutes.js')
const productRoutes = require('./src/routers/ProductRoutes.js')
const sellerProductsRoutes = require('./src/routers/SellerProductsRoutes.js')

const cartRoutes = require("./src/routers/CartRoutes.js")
const orderRoutes = require("./src/routers/orderRoutes.js")
const sellerOrderRoutes = require("./src/routers/SellerOrderRoutes.js")
const paymentRoutes = require("./src/routers/paymentRoutes.js")
const transactionRoutes = require("./src/routers/TransactonRoutes.js")
const sellerReportRoutes = require("./src/routers/SellerReportRoutes")
const homeCategoryRotes = require("./src/routers/HomeCategoryRoutes.js")
const dealRoutes = require("./src/routers/DealRoutes.js")

app.use('/auth', authRouters )
app.use("/api/users", userRoutes)
app.use("/sellers", sellerRouters)
app.use('/admin', adminRoutes)

app.use("/products", productRoutes)
app.use("/api/sellers/products", sellerProductsRoutes)

app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/seller/orders', sellerOrderRoutes)

app.use('/api/payment', paymentRoutes)
app.use("/api/transactions", transactionRoutes)
app.use("/api/seller/report", sellerReportRoutes)

app.use('/home', homeCategoryRotes)
app.use('/admin/deals', dealRoutes)



app.listen(port, async()=>{
    console.log(`server is runnig on port ${port}`);
    await connectDB()
    
})
