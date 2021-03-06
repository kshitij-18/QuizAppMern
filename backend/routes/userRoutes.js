const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const verifyToken = require('../middleware/auth')
// const {upload} = require("../server")
const multerStorage = require("../utils/multerConfig")
const multerFilter = require("../utils/multerFilter")
const multer = require('multer')
const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
})


// GET /api/users
// Gets all the users in the database
router.get("/", userController.getUsers)

// POST /api/users
// Creates a user in the database
router.post("/", upload.single("profilePicture"),userController.createUser)

// PUT /api/users/:quizid
// Logs the quiz that the user has taken
router.put("/:quizid", verifyToken, userController.attemptQuiz)

// GET /api/users/auth
// Gets the authenticated user
// @access PRIVATE
router.get("/auth", verifyToken, userController.getAuthUser)

// POST /api/users/login
// Logs in the user
// @access PUBLIC
router.post("/login", userController.loginUser)

module.exports = router