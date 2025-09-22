const express = require('express');
const sellerMiddleWare = require('../middleware/sellerAuthMiddleware');
const sellerReportController = require('../controller/sellerReportController');



const router = express.Router();

router.get("/", sellerMiddleWare, sellerReportController.getSellerReport)
module.exports = router;