const express = require('express');
const userController = require('../controller/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get("/profile",authMiddleware, userController.getUserProfileByJwt)

module.exports = router;