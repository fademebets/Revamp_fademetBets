const express = require("express")
const router = express.Router()

const adminUserController = require("../controllers/adminUserController")
const adminAuth = require('../middlewares/adminAuth');

// GET users with pagination
router.get("/admin-users", adminAuth, adminUserController.getAllUsers)

router.get("/admin-users/email/:email", adminAuth, adminUserController.getUserByEmail)

// DELETE user
router.delete("/admin-users/:userId", adminAuth, adminUserController.deleteUser)

// UPDATE user
router.put("/admin-users/:userId", adminAuth, adminUserController.updateUser)

module.exports = router
