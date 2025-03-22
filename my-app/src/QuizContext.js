import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizState, setQuizState] = useState({
    topic: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    isLoading: false,
    isFinished: false
  });

  const selectTopic = (topic) => {
    setQuizState(prev => ({
      ...prev,
      topic,
      questions: [],
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      isLoading: true,
      isFinished: false
    }));
  };

  const setQuestions = (questions) => {
    setQuizState(prev => ({
      ...prev,
      questions,
      isLoading: false
    }));
  };

  const answerQuestion = (questionId, answer) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
  };

  const nextQuestion = () => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      finishQuiz();
    }
  };

  const prevQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const finishQuiz = () => {
    // Calculate score
    const correctAnswers = quizState.questions.filter(
      question => quizState.answers[question.id] === question.correctAnswer
    ).length;
    
    const score = (correctAnswers / quizState.questions.length) * 100;
    
    setQuizState(prev => ({
      ...prev,
      score,
      isFinished: true
    }));
  };

  const resetQuiz = () => {
    setQuizState({
      topic: null,
      questions: [],
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      isLoading: false,
      isFinished: false
    });
  };

  return (
    <QuizContext.Provider
      value={{
        quizState,
        selectTopic,
        setQuestions,
        answerQuestion,
        nextQuestion,
        prevQuestion,
        finishQuiz,
        resetQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};