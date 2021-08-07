const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

// GET /api/users
// Gets all the users in the database
router.get("/", userController.getUsers)

// POST /api/users
// Creates a user in the database
router.post("/", userController.createUser)

module.exports = router