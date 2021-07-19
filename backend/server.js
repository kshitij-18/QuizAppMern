const express = require('express')
require('dotenv').config()
const db = require('mongoose')
const PORT = process.env.PORT || 5000


const app = express()


// Connecting to the Database
const url = `mongodb+srv://kshitij:${process.env.MONGO_PASSWORD}@cluster0.tzic9.mongodb.net/QuizDB?retryWrites=true&w=majority`
db.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected")
}).catch((e) => {
    e.toString();
})

app.listen(PORT, () => {
    console.log(`Server started and listening at ${PORT}`)
})
