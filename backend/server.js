const express = require('express')
require('dotenv').config()
const db = require('mongoose')
const PORT = process.env.PORT || 5000
const cors = require('cors')

const questionRoutes = require('./routes/questionRoutes')




const app = express()

// Using Middleware
app.use(cors())
app.use(express.json())
app.use("/api/questions", questionRoutes)


// Connecting to the Database
const url = `mongodb+srv://kshitij:${process.env.MONGO_PASSWORD}@cluster0.tzic9.mongodb.net/QuizDB?retryWrites=true&w=majority`
db.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(() => {
    console.log("Database Connected")
}).catch((e) => {
    e.toString();
})

app.listen(PORT, () => {
    console.log(`Server started and listening at ${PORT}`)
})
