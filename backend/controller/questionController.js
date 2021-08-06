const { findOneAndUpdate } = require('../database/questionModel')
const Question = require('../database/questionModel')

const questionController = {
    createQuestion: async (req, res) => {
        const text = req.body.text
        const choices = req.body.choices

        try {
            let data = await Question.create({
                text: text,
                choices: choices,
                course: req.body.course
            })

            res.status(201).json({
                data
            })
        } catch (error) {
            console.log("Server Error")
        }
    },

    getAllQuestions: async (req, res) => {
        try {
            let data = await Question.find()

            res.status(200).json({ data })
        } catch (error) {
            res.status(500).json({ msg: "Server Error" })
        }
    },

    updateQuestion: async (req, res) => {
        let quesId = req.params.id
        const doc = await Question.findById(quesId)
        // console.log(doc.text)

        let currentQues = doc.text
        let updatedQuestion = req.body.text === currentQues ? currentQues : req.body.text
        const update = {
            text: updatedQuestion,
            choices: req.body.choices && req.body.choices !== doc.choices ? req.body.choices : doc.choices
        }
        try {

            await Question.findOneAndUpdate({ _id: quesId }, update)
            console.log(update)
            return res.status(200).json({
                msg: "Successfully Updated"
            })
        } catch (error) {
            res.status(500).json({
                msg: error.message
            })
        }
    },
    deleteQuestion: async (req, res) => {
        try {
            await Question.findOneAndDelete({ id: req.params.id })

            res.status(200).json({
                msg: "Question Deleted Successfully"
            })
        } catch (error) {
            res.status(500).json({
                msg: error.message
            })
        }
    }
}

module.exports = questionController