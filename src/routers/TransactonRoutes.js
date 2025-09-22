const express = require('express');
const sellerMiddleWare = require('../middleware/sellerAuthMiddleware.js');
const transactionController = require('../controller/transactionController.js');


const router = express.Router();

router.get("/seller", sellerMiddleWare, transactionController.getTransactionBySeller)
module.exports = router;