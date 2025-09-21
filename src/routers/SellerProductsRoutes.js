const express = require('express');
const sellerMiddleWare = require('../middleware/sellerAuthMiddleware.js');
const productController = require('../controller/productController.js');

const router = express.Router();

router.get('/', sellerMiddleWare, productController.getProductsBySellerId)
router.post('/', sellerMiddleWare, productController.createProduct)
router.delete('/:productId', sellerMiddleWare, productController.deleteProduct)
router.patch('/:productId', sellerMiddleWare, productController.updateProduct)

module.exports = router;