import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import { submitQuizResults } from './quizService';
import { CheckCircleIcon, XCircleIcon, RotateCcwIcon, HomeIcon } from 'lucide-react';

const QuizResults = () => {
  const { quizState, resetQuiz } = useQuiz();
  const { topic, questions, answers, score } = quizState;
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        setIsLoading(true);
        const result = await submitQuizResults(topic, answers, questions);
        setFeedback(result.feedback);
      } catch (error) {
        console.error("Error getting quiz feedback:", error);
        setFeedback("Couldn't retrieve personalized feedback at this time.");
      } finally {
        setIsLoading(false);
      }
    };

    getFeedback();
  }, [topic, answers, questions]);

  const handleTryAgain = () => {
    resetQuiz();
    navigate('/cs-quiz-topics');
  };

  const handleGoHome = () => {
    resetQuiz();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">{topic} Quiz Results</h2>
          
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold">
                    {Math.round(score)}%
                  </div>
                  <div className="text-gray-400 mt-2">
                    {Math.round(score) >= 70 ? 'Great job!' : 'Keep practicing!'}
                  </div>
                </div>
              </div>
              {/* Circular progress indicator */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" 
                  stroke="#374151" 
                  strokeWidth="8"
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" 
                  stroke={score >= 70 ? "#10B981" : "#EF4444"} 
                  strokeWidth="8"
                  strokeDasharray={`${score * 2.83} ${283 - score * 2.83}`} 
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Your Performance</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <span>{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Correct Answers:</span>
                <span className="text-green-400">
                  {questions.filter(q => answers[q.id] === q.correctAnswer).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Incorrect Answers:</span>
                <span className="text-red-400">
                  {questions.filter(q => answers[q.id] && answers[q.id] !== q.correctAnswer).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Unanswered:</span>
                <span className="text-yellow-400">
                  {questions.filter(q => !answers[q.id]).length}
                </span>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
              <p className="mt-2 text-gray-400">Getting your personalized feedback...</p>
            </div>
          ) : (
            <div className="mb-8 bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Feedback</h3>
              <p className="text-gray-300">{feedback}</p>
            </div>
          )}
          
          <h3 className="text-xl font-semibold mb-4">Question Review</h3>
          <div className="space-y-4 mb-8">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              const hasAnswer = !!userAnswer;
              
              return (
                <div key={question.id} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3">
                      {hasAnswer ? (
                        isCorrect ? (
                          <CheckCircleIcon className="text-green-500" size={20} />
                        ) : (
                          <XCircleIcon className="text-red-500" size={20} />
                        )
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-yellow-500/50"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium mb-2">
                        {index + 1}. {question.question}
                      </p>
                      <div className="text-sm">
                        {hasAnswer && !isCorrect && (
                          <p className="text-red-400">
                            Your answer: {userAnswer}. {question.options[userAnswer.charCodeAt(0) - 65]}
                          </p>
                        )}
                        <p className="text-green-400">
                          Correct answer: {question.correctAnswer}. {question.options[question.correctAnswer.charCodeAt(0) - 65]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleTryAgain}
              className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <RotateCcwIcon size={18} className="mr-2" />
              Try Another Quiz
            </button>
            <button 
              onClick={handleGoHome}
              className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <HomeIcon size={18} className="mr-2" />
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;