const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    profilePic:String,
    quiz: [
        {
            quizAttempted: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Quiz',
            },
            score: Number,
            dateAttempted: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    totalScore: {
        type: Number,
        default: 0
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User