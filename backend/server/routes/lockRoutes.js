const express = require('express');
const router = express.Router();
const lockController = require('../controllers/lockController');
const adminMiddleware = require('../middlewares/adminAuth');

// ✅ Public Route — Get Active Lock of the Day (within 24 hours)
router.get('/active-today', lockController.getActiveLockOfTheDay);

// ✅ Admin Routes
router.post('/create', adminMiddleware, lockController.createLock);
router.get('/all', adminMiddleware, lockController.getAllLocks);
router.put('/edit/:id', adminMiddleware, lockController.editLock);
router.delete('/delete/:id', adminMiddleware, lockController.deleteLock);

module.exports = router;
