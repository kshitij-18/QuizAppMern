import axios from 'axios';

 export async function fetchQuizById(id) {
  try {
    const data = await axios.get(`/api/quiz/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}