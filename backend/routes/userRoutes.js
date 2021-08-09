const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const verifyToken = require('../middleware/auth')

// GET /api/users
// Gets all the users in the database
router.get("/", verifyToken, userController.getUsers)

// POST /api/users
// Creates a user in the database
router.post("/", userController.createUser)

module.exports = router