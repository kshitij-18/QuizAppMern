import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitAndCheckQuiz } from "../api/quizApis/Mutation";

export const QuizContext = React.createContext({});

const QuizContextComponent = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const navigate = useNavigate();
  const quizSubmitMutation = useMutation(submitAndCheckQuiz);
  // [
  //     {
  //         questionId: something
  //         choiceSelectedId: something
  //     }
  // ]

  const [questionsAttempted, setQuestionsAttempted] = useState([]);
  const [modalData, setModalData] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const submitQuiz = ({ quizId }) => {
    quizSubmitMutation.mutate(
      { quizId, questionsAttempted },
      {
        onSuccess: () =>
          navigate("/", {
            replace: true,
            state: {
              message: "Quiz submitted successfully",
              severity: "success",
            },
          }),
      }
    );
  };

  const quizProviderValue = {
    currentQuestion,
    setCurrentQuestion,
    questionsAttempted,
    setQuestionsAttempted,
    submitQuiz,
    modalOpen,
    setModalOpen,
    modalData,
    setModalData,
  };

  return (
    <QuizContext.Provider value={quizProviderValue}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContextComponent;
