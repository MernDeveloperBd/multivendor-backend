const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controller/orderController');

const router = express.Router();

router.post("/", authMiddleware, orderController.createOrder)
router.get("/user", authMiddleware, orderController.getUerOrderHistory )
router.put("/:orderId/cancel", authMiddleware, orderController.cancelOrder )
router.get("/:orderId", authMiddleware, orderController.getOrderById )
router.get("/item/:orderItemId", authMiddleware, orderController.getOrderByItemId )
router.delete("/:orderId", authMiddleware, orderController.deleteOrder )

module.exports = router ;