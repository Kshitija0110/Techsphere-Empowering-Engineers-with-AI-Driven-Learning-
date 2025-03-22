import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon, Database as DatabaseIcon, Server as ServerIcon, Share2 as NetworkIcon } from 'lucide-react';
import { useQuiz } from './QuizContext';

const CSQuizTopicSelector = () => {
  const navigate = useNavigate();
  const { selectTopic } = useQuiz();

  const topics = [
    {
      id: 'os',
      name: 'Operating Systems',
      description: 'Process management, memory management, file systems, and more.',
      icon: ServerIcon,
      color: 'blue'
    },
    {
      id: 'dbms',
      name: 'Database Management Systems',
      description: 'SQL, normalization, transaction management, and database design.',
      icon: DatabaseIcon,
      color: 'green'
    },
    {
      id: 'dsa',
      name: 'Data Structures & Algorithms',
      description: 'Arrays, linked lists, trees, sorting algorithms, complexity analysis, and more.',
      icon: BookOpenIcon,
      color: 'purple'
    },
    {
      id: 'cn',
      name: 'Computer Networks',
      description: 'OSI model, TCP/IP, routing, subnetting, network security, and protocols.',
      icon: NetworkIcon,
      color: 'orange'
    }
  ];

  const handleTopicSelect = (topic) => {
    selectTopic(topic.name);
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6 space-x-2">
          <BookOpenIcon className="text-green-400" size={28} />
          <h1 className="text-3xl font-bold">CS Fundamentals <span className="text-green-400">Quiz</span></h1>
        </div>
        
        <div className="mb-8">
          <p className="text-gray-300 text-lg">
            Test your knowledge of computer science fundamentals with our interactive quizzes.
            Select a topic below to start a 10-question quiz.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map(topic => (
            <div 
              key={topic.id}
              className={`bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-${topic.color}-500 transition-all duration-300 hover:shadow-lg hover:shadow-${topic.color}-500/20 cursor-pointer group`}
              onClick={() => handleTopicSelect(topic)}
            >
              <div className={`bg-${topic.color}-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-${topic.color}-500 transition-all duration-300`}>
                <topic.icon className={`text-${topic.color}-400 group-hover:text-white`} size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{topic.name}</h3>
              <p className="text-gray-400 mb-6">{topic.description}</p>
              <button className={`text-${topic.color}-400 flex items-center group-hover:text-${topic.color}-300`}>
                Start Quiz <span className="ml-2 group-hover:ml-3 transition-all">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CSQuizTopicSelector;