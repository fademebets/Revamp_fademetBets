const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');


router.get('/sales/7days', salesController.getLast7DaysSales);
router.get('/sales/30days', salesController.getLast30DaysSales);
router.get('/sales/3months', salesController.getLast3MonthsSales);

module.exports = router;
