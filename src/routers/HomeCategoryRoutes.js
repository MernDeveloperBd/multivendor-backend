const express = require('express');
const homeCategoryController = require('../controller/homeCategoryController');


const router = express.Router();

router.post('/categories', homeCategoryController.createHomeCategories)
router.get('/home-category', homeCategoryController.getHomeCategory)
router.post('/home-category/:id', homeCategoryController.updateHomeCategory)

module.exports = router;