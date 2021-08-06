var express = require('express')
const router = express.Router()
const questionController = require('../controller/questionController')

// POST /api/questions
// Creates a new question
router.post("/", questionController.createQuestion)

// GET /api/questions
// Gets all the questions
router.get("/", questionController.getAllQuestions)

// PUT /api/questions/:id
// Updates the question
router.put("/:id", questionController.updateQuestion)

// DELETE /api/questions/:id
// Deletes the question
router.delete("/:id", questionController.deleteQuestion)

module.exports = router