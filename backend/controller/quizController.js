const Question = require('../database/questionModel')
const Quiz = require('../database/quizModel')

const quizController = {
    getQuiz: async (req, res) => {
        try {
            const data = await Quiz.find()
            res.status(200).json({
                data
            })
        } catch (error) {
            res.status(500).json({
                msg: error.message
            })
        }
    },

    createQuiz: async (req, res) => {
        const name = req.body.name
        const course = req.body.course && req.body.course
        const questions = await Question.find({ course: course })

        // console.log(questions)

        try {
            let data = await Quiz.create({
                name: name,
                course: course,
                questions: questions
            })

            res.status(201).json({
                data
            })
        } catch (error) {
            res.status(500).json({
                msg: error.message
            })
        }
    },

    addQuestion: async (req, res) => {
        const quiz = await Quiz.findById(req.params.id)
        // console.log(quiz)
        const questionsToAdd = await Question.find({ course: quiz.course })

        try {
            quiz.questions = [...questionsToAdd]

            await quiz.save()

            res.status(200).json({
                msg: "Questions successfully added"
            })
        } catch (error) {
            res.status(500).json({
                msg: error.message
            })
        }

    }
}

module.exports = quizController