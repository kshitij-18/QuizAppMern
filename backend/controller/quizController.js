const Question = require('../database/questionModel')
const Quiz = require('../database/quizModel')

const quizController = {
    getQuiz: async (req, res) => {
        try {
            const { course = null, search = null, limit = 10, skip = 0 } = req.query;
            const data = await Quiz.find({
                ...(course ? {course} : {}),
                ...(search ? {'name': {
                    $regex: new RegExp(search),
                    $options: 'i'
                }} : {})
            }, {},{skip: Number(skip), limit: Number(limit)}).
            populate('questions', "-choices.isCorrect -choices._id")
            
            const totalCount = await Quiz.countDocuments({
              ...(course ? { course } : {}),
              ...(search
                ? {
                    name: {
                      $regex: new RegExp(search),
                      $options: "i",
                    },
                  }
                : {}),
            }).exec();
            res.status(200).json({
                totalCount,
                data
            })
        } catch (error) {
            res.status(500).json({
                msg: error.message
            })
        }
    },

    getQuizById: async (req, res) => {
        try {
            const {id} = req.params;

            const data = await Quiz.findById(id).populate("questions", "-choices.isCorrect");
            return res.status(200).json({
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
        const questionsFromFrontend = req.body.questions
        const questionsToStore = questionsFromFrontend.map(question => ({...question, slug:`${name}${course}`}))
        // console.log(questions)

        try {
            await Question.insertMany(questionsToStore)
            const questionArray = await Question.aggregate([
                {
                    $match:{"slug":{$in:[`${name}${course}`]}}
                }
            ])
            let data = await Quiz.create({
                name: name,
                course: course,
                questions: questionArray
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
        
        try {
            const quiz = await Quiz.findById(req.params.id)
            const {questions} = req.body 
            const {name, course} = quiz
            const questionsToStore = questions.map(question => ({...question, slug:`${name}${course}`}))
            const storedQuestions = await Question.insertMany(questionsToStore)
            quiz.questions = [...quiz.questions, ...storedQuestions]

            await quiz.save()

            res.status(200).json({
                msg: "Questions successfully added"
            })
        } catch (error) {
            res.status(500).json({
                msg: error.message
            })
        }

    },

    getDistinctCourses: async (req, res) => {
        try {
            const result = await Quiz.distinct('course');
            return res.status(200).json({result});
        } catch (error) {
            return res.status(500).json({
                msg:error.message
            })
        }
    }
}

module.exports = quizController