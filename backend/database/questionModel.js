const mongoose = require('mongoose')

const { Schema } = mongoose

const questionSchema = new Schema({
    text: {
        type: String,
        required: true
    },

    course: {
        type: String,
        // required: true
    },

    difficulty: {
        type: String,
        // required: true
    },

    choices: [
        {
            text: String,
            isCorrect: {
                type: Boolean,
                default: false
            }
        }
    ]
})

const Question = mongoose.model("Question", questionSchema)

module.exports = Question