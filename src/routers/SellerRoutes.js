const express = require('express');
const sellerController = require('../controller/sellerController');
const sellerMiddleWare = require('../middleware/sellerAuthMiddleware');

const router = express.Router();

router.get("/profile",sellerMiddleWare, sellerController.getSellerProfile)
router.post("/", sellerController.createSeller)
router.get("/", sellerController.getAllSellers)
router.patch('/', sellerMiddleWare, sellerController.updateSeller)

router.post("/verify/login-otp", sellerController.verifyloginOtp);

module.exports = router;