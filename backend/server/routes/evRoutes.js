const express = require('express');
const router = express.Router();
const evController = require('../controllers/evController');
const adminAuth = require('../middlewares/adminAuth');

// Create new EV (Admin only)
router.post('/create', adminAuth, evController.createEV);

// Get all active EVs (Public)
router.get('/active', evController.getActiveEVs);

// Get all EVs (Admin only)
router.get('/', adminAuth, evController.getAllEVs);

// Update an EV (Admin only)
router.put('/:id', adminAuth, evController.updateEV);

// Delete an EV (Admin only)
router.delete('/:id', adminAuth, evController.deleteEV);

module.exports = router;
