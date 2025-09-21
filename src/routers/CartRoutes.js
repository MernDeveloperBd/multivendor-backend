const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const CartController = require('../controller/CartController');

const router = express.Router();

router.get("/",authMiddleware, CartController.findUserCartHandler)
router.post("/add",authMiddleware, CartController.addItemsToCart)
router.delete("/item/:cartItemId",authMiddleware, CartController.deleteCartItemHandler)
router.put("/item/:cartItemId",authMiddleware, CartController.updateteCartItemHandler)

module.exports = router;