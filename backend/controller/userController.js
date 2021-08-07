const Quiz = require('../database/quizModel')
const User = require('../database/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
    getUsers: async (req, res) => {
        try {
            const data = await User.find().select('-password')

            res.status(200).json({
                data
            })
        } catch (error) {
            res.status(500).json({
                msg: error.message
            })
        }
    },

    createUser: async (req, res) => {
        const { name, username, email, password } = req.body

        // Checking if user already exists
        const userInDb = await User.findOne({ username })
        console.log(userInDb)
        if (userInDb) {
            return res.status(400).json({
                msg: "User already exists"
            })
        }

        // Create the new user
        const user = new User({
            name,
            email,
            username,
            password
        })

        // Hashing the password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        try {
            await user.save()

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600000 }, (error, token) => {
                if (error) return res.status(400).json({ error })
                return res.status(201).json({
                    token: token
                })
            })
        } catch (error) {
            res.status(500).json({
                msg: error.message
            })
        }
    }
}

module.exports = userController