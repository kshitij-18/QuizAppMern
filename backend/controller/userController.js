const Quiz = require("../database/quizModel");
const User = require("../database/userModel");
const Question = require("../database/questionModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const fs = require("fs");

const userController = {
  getUsers: async (req, res) => {
    try {
      const data = await User.find().select("-password");

      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },

  createUser: async function (req, res) {
    try {
      const { name, username, email, password } = req.body;
      for (const [key, value] of Object.entries(req.body)) {
        if (value === "") {
          return res.status(400).json({ msg: `${key} cannot be empty` });
        }
      }

      if (req.file) {
        try {
          await uploadFile(
            "kshitij-quiz-bucket-1",
            req.file.filename,
            req.file.path,
            () => fs.unlinkSync(req.file.path)
          );
        } catch (error) {
          console.log(error);
        }
      }
      // Checking if user already exists
      const userInDb = await User.findOne({ username });
      if (userInDb) {
        return res.status(400).json({
          msg: "User already exists",
        });
      }

      // Create the new user
      const user = new User({
        name,
        email,
        username,
        password,
        profilePic: req.file ? process.env.GCP_STORAGE + req.file.filename : "",
      });

      // Hashing the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600000 },
        (error, token) => {
          if (error) return res.status(400).json({ error });
          return res.status(201).json({
            token: token,
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },

  attemptQuiz: async (req, res) => {
    console.log(req.body)
    const { questionsAttempted = [] } = req.body;
    const quizAttempted = await Quiz.findById(req.params.quizid).populate(
      "questions",
      "text choices"
    );
    const user = await User.findById(req.user.id);
    const { questions: allQuestionsInQuiz } = quizAttempted;
    // const score = questionsAttempted.reduce((acc, ques) => {
    //     const {questionId = "", choiceSelectedId = ""} = ques;
    //     const attemptedQuestion = allQuestions.find(({_id: dbQuestionId}) => {
    //         console.log('::::DB QUESTION ID', dbQuestionId, questionId);
    //         return dbQuestionId === questionId;
    //     })
    //     if (!!attemptedQuestion) {
    //         const attemptedChoice = attemptedQuestion.choices?.find(({_id: dbChoiceId}) => dbChoiceId === choiceSelectedId);
    //         if(attemptedChoice?.isCorrect) acc+=5;
    //         return acc;
    //     } else {
    //         return res.status(400).json({
    //             message: "Something went wrong while checking the Quiz",
    //         })
    //     }
    // }, 0);
    const score = questionsAttempted.reduce(
      (acc, { questionId, choiceSelectedId }) => {
        const questionAttempted = allQuestionsInQuiz.find(
          ({ _id: questionInDbId }) => questionInDbId.toString() === questionId
        );
        const choiceSelected = questionAttempted?.choices?.find(
          ({ _id: choiceIdInDb }) =>
            choiceIdInDb.toString() === choiceSelectedId
        );
        if (choiceSelected?.isCorrect) {
          acc += 5;
          return acc;
        }
        return acc;
      },
      0
    );
    const quiz = {
      quizAttempted,
      score,
    };

    user.totalScore += score;

    try {
      user.quiz.unshift(quiz);

      await user.save();

      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },
  getAuthUser: async (req, res) => {
    try {
      const data = await User.findById(req.user.id).select("-password");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if user already exists
      const userInDb = await User.findOne({ username: username });

      if (userInDb) {
        const verified = await bcrypt.compare(password, userInDb.password);
        if (!verified) {
          return res.status(401).json({ msg: "Please check the password" });
        }
      } else {
        return res.status(401).json({ msg: "Sorry no such user exists" });
      }

      const payload = {
        user: {
          id: userInDb.id,
        },
      };
      return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600000 },
        (error, token) => {
          if (error) throw error;
          res.status(200).json({ token });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: "Server Error" });
    }
  },
};

const uploadFile = async (
  bucketName,
  fileName,
  filePath,
  clearUploadFunction
) => {
  const GoogleCloud = new Storage({
    keyFilename: path.join(__dirname, "../quizapp-345312-4adb7bcf43f0.json"),
    projectId: "quizapp-345312",
  });

  await GoogleCloud.bucket(bucketName).upload(filePath, {
    destination: fileName,
  });

  console.log(`${fileName} uploaded to ${bucketName}`);
  clearUploadFunction();
};

uploadFile.bind(userController);

module.exports = userController;
