import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, BookOpenIcon, ChartBarIcon, MessageCircleIcon, MenuIcon, UserIcon, LogOutIcon } from 'lucide-react';

function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-500 rounded-md flex items-center justify-center">
              <span className="font-bold text-xl">T</span>
            </div>
            <h1 className="text-xl font-bold">TechSphere</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-blue-400 transition">Dashboard</a>
            <a href="#" className="hover:text-blue-400 transition">Resources</a>
            <a href="#" className="hover:text-blue-400 transition">Progress</a>
            <a href="#" className="hover:text-blue-400 transition">Support</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 border border-gray-600 rounded-full py-1 px-3 bg-gray-700">
              <UserIcon size={18} />
              <span className="text-sm">Student</span>
            </div>
            <button className="md:hidden">
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to <span className="text-blue-400">TechSphere</span></h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Your all-in-one platform for technical education, mock interviews, 
            performance tracking, and AI-powered learning assistance.
          </p>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Mock Interview Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer group">
            <div className="bg-blue-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-all duration-300">
              <BriefcaseIcon className="text-blue-400 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Mock Interviews</h3>
            <p className="text-gray-400 mb-4">Practice technical interviews with our AI interviewer tailored to your skill level.</p>
            <button className="text-blue-400 flex items-center group-hover:text-blue-300">
              Start Interview <span className="ml-2 group-hover:ml-3 transition-all">→</span>
            </button>
          </div>
          
          {/* CS Fundamentals Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer group">
            <div className="bg-green-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-500 transition-all duration-300">
              <BookOpenIcon className="text-green-400 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">CS Fundamentals Quiz</h3>
            <p className="text-gray-400 mb-4">Test your knowledge of computer science concepts with interactive quizzes.</p>
            <Link to="/cs-quiz-topics" className="text-green-400 flex items-center group-hover:text-green-300">
              Take Quiz <span className="ml-2 group-hover:ml-3 transition-all">→</span>
            </Link>
          </div>
          
          {/* Textbook RAG Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer group">
            <div className="bg-purple-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-all duration-300">
              <BookOpenIcon className="text-purple-400 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Textbook-Based Queries</h3>
            <p className="text-gray-400 mb-4">Ask questions about your textbooks and get AI-powered answers with RAG technology.</p>
            <Link to="/chat-with-pdf" className="text-purple-400 flex items-center group-hover:text-purple-300">
              Ask a Question <span className="ml-2 group-hover:ml-3 transition-all">→</span>
            </Link>
          </div>
          
          {/* Dashboard Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 cursor-pointer group">
            <div className="bg-orange-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-all duration-300">
              <ChartBarIcon className="text-orange-400 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Performance Dashboard</h3>
            <p className="text-gray-400 mb-4">Track your progress with detailed analytics and personalized insights.</p>
            <button className="text-orange-400 flex items-center group-hover:text-orange-300">
              View Dashboard <span className="ml-2 group-hover:ml-3 transition-all">→</span>
            </button>
          </div>
        </div>
        
        {/* AI Chatbot Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <div className="bg-indigo-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MessageCircleIcon className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">AI Chatbot for Engineering Queries</h2>
              <p className="text-gray-300 mb-4">
                Get instant answers to your engineering questions from our specialized AI chatbot. 
                Whether it's algorithms, data structures, or system design - we've got you covered.
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center transition-all">
                Chat with AI <span className="ml-2">→</span>
              </button>
            </div>
            <div className="md:w-1/2 bg-gray-900 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <div className="flex-grow text-center text-gray-400 text-xs">AI Assistant</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-2 mr-3 mt-1">
                    <MessageCircleIcon size={16} />
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-sm text-gray-300">
                    Hello! How can I help with your engineering questions today?
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="bg-gray-700 rounded-lg p-3 text-sm text-gray-300">
                    Can you explain the time complexity of quicksort?
                  </div>
                  <div className="bg-blue-600 rounded-full p-2 ml-3 mt-1">
                    <UserIcon size={16} />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-2 mr-3 mt-1">
                    <MessageCircleIcon size={16} />
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-sm text-gray-300">
                    Quicksort has an average time complexity of O(n log n), but its worst case is O(n²) when the pivot selection is poor...
                  </div>
                </div>
              </div>
              <div className="mt-4 flex">
                <input 
                  type="text" 
                  placeholder="Ask your question..." 
                  className="bg-gray-700 border border-gray-600 rounded-l-lg px-4 py-2 text-gray-200 flex-grow focus:outline-none focus:border-indigo-500" 
                />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">10,000+</div>
            <div className="text-gray-400">Practice Questions</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
            <div className="text-gray-400">Mock Interviews</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-gray-400">Textbooks Integrated</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">95%</div>
            <div className="text-gray-400">Success Rate</div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-6 w-6 bg-blue-500 rounded-md flex items-center justify-center">
                <span className="font-bold text-sm">T</span>
              </div>
              <h1 className="text-lg font-bold">TechSphere</h1>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition">Home</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Features</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Pricing</a>
              <a href="#" className="text-gray-400 hover:text-white transition">About</a>
            </div>
            <div className="text-gray-500 text-sm">
              © 2025 TechSphere. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
