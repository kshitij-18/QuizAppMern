const Question = require('../database/questionModel')

const questionController = {
    createQuestion: async (req, res) => {
        const text = req.body.text
        const choices = req.body.choices

        try {
            let data = await Question.create({
                text: text,
                choices: choices
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
    }
}

module.exports = questionController