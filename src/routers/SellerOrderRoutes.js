const express = require('express');
const sellerMiddleWare = require('../middleware/sellerAuthMiddleware.js');
const orderController = require('../controller/orderController.js');

const router = express.Router();

router.get("/", sellerMiddleWare, orderController.getSellersOrder)
router.patch("/:orderId/status/:orderStatus", sellerMiddleWare, orderController.updateOrderStatus )


module.exports = router ;