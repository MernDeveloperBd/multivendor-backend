const express = require("express");
const paymentController = require("../controller/paymentController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();


router.post("/initiate", paymentController.initiate);
router.post("/execute",authMiddleware, paymentController.execute);
router.post("/query", paymentController.queryPayment);
router.get("/trx/:trxID", paymentController.checkByTrx);

module.exports = router;