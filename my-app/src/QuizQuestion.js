import React from 'react';
import { useQuiz } from './QuizContext';

const QuizQuestion = () => {
  const { quizState, answerQuestion, nextQuestion, prevQuestion, finishQuiz } = useQuiz();
  const { questions, currentQuestionIndex, answers } = quizState;
  
  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id] || '';
  
  const handleAnswerSelect = (option) => {
    answerQuestion(currentQuestion.id, option);
  };
  
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex justify-between mb-4">
        <span className="text-gray-400">Question {currentQuestionIndex + 1} of {questions.length}</span>
        <span className="text-gray-400">{quizState.topic}</span>
      </div>
      
      <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
      
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedAnswer === optionLetter;
          
          return (
            <div 
              key={index}
              onClick={() => handleAnswerSelect(optionLetter)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                isSelected 
                  ? 'bg-green-600/20 border-green-500 text-white' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  isSelected ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
                }`}>
                  {optionLetter}
                </div>
                <span>{option}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 rounded-lg ${
            currentQuestionIndex === 0
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          Previous
        </button>
        
        {isLastQuestion ? (
          <button
            onClick={finishQuiz}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Finish Quiz
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;