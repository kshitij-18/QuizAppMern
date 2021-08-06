const express = require('express')
const router = express.Router()
const quizController = require('../controller/quizController')

// GET /api/quiz
// Gets all the quizzes available
router.get("/", quizController.getQuiz)

// POST /api/quiz
// Creates a new quiz
router.post("/", quizController.createQuiz)

module.exports = router