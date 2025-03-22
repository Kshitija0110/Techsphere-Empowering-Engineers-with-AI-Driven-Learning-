import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, Loader2Icon } from 'lucide-react';
import { useQuiz } from './QuizContext';
import { fetchQuizQuestions } from './quizService';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';

const CSQuiz = () => {
  const { quizState, setQuestions, resetQuiz } = useQuiz();
  const navigate = useNavigate();
  
  // Redirect to topic selection if no topic is selected
  useEffect(() => {
    if (!quizState.topic) {
      navigate('/cs-quiz-topics');
      return;
    }
    
    // Fetch questions when component mounts and topic is selected
    const getQuestions = async () => {
      try {
        const questions = await fetchQuizQuestions(quizState.topic);
        setQuestions(questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        // Handle error - maybe show an error state
      }
    };
    
    if (quizState.isLoading && quizState.questions.length === 0) {
      getQuestions();
    }
  }, [quizState.topic, quizState.isLoading, quizState.questions.length, navigate, setQuestions]);

  const handleBack = () => {
    if (window.confirm("Are you sure you want to leave the quiz? Your progress will be lost.")) {
      resetQuiz();
      navigate('/cs-quiz-topics');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {!quizState.isFinished && (
          <button 
            onClick={handleBack}
            className="flex items-center text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeftIcon size={16} className="mr-1" /> Back to Topics
          </button>
        )}
        
        {quizState.isLoading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <Loader2Icon size={40} className="animate-spin text-green-500 mb-4" />
            <p className="text-lg text-gray-300">Loading quiz questions...</p>
          </div>
        ) : quizState.isFinished ? (
          <QuizResults />
        ) : (
          <QuizQuestion />
        )}
      </div>
    </div>
  );
};

export default CSQuiz;