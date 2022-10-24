import axios from 'axios'

export const submitAndCheckQuiz = async ({questionsAttempted, quizId}) => {
    console.log(questionsAttempted)
    try {
        const data = await axios.post(`/api/users/${quizId}`, {questionsAttempted});
        return data;
    } catch (error) {
        throw new Error(error)
    }
}