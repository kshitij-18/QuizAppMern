import React, {useState} from 'react';

export const QuizContext = new React.createContext({});

const QuizContextComponent = ({children}) => {
    const [currentQuestion, setCurrentQuestion] = useState("")
    // [
    //     {
    //         questionId: something
    //         choiceSelectedId: something
    //     }
    // ]
    const [questionsAttempted, setQuestionsAttempted] = useState([]);

    const quizProviderValue = {
        currentQuestion,
        setCurrentQuestion,
        questionsAttempted, 
        setQuestionsAttempted
    }

    return (
        <QuizContext.Provider value={quizProviderValue}>
            {children}
        </QuizContext.Provider>
    )
}

export default QuizContextComponent;