import React from 'react'
import QuizMain from './QuizMain'
import QuizContextComponent from '../contexts/QuizContext'

const QuizMainWithContext = () => {
  return (
    <QuizContextComponent>
        <QuizMain />
    </QuizContextComponent>
  )
}

export default QuizMainWithContext