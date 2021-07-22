var express = require('express')
const router = express.Router()
const questionController = require('../controller/questionController')

// POST /api/questions
// Creates a new question
router.post("/", questionController.createQuestion)

// GET /api/questions
// Gets all the questions
router.get("/", questionController.getAllQuestions)


module.exports = router