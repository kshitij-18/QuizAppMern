const mongoose = require('mongoose')

const { Schema } = mongoose

const quizSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    course: String,

})