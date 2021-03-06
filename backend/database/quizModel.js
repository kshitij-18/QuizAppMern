const mongoose = require('mongoose')

const { Schema } = mongoose

const quizSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    course:{
        type:String,
        required:true
    },

    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]

})

const Quiz = mongoose.model("Quiz", quizSchema)
module.exports = Quiz
