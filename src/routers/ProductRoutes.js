const express = require('express');
const productController = require('../controller/productController.js');

const router = express.Router();

//search for products by query
router.get('/search', productController.searchProduct)

//get all products with filters
router.get('/', productController.getAllProducts)

//get product by id
router.get('/:productId', productController.getProductByID)

module.exports = router;