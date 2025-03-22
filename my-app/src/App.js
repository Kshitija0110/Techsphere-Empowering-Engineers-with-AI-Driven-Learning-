import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CSQuizTopicSelector from './CSQuizTopicSelector.js';
import CSQuiz from './CSQuiz.js';
import { QuizProvider } from './QuizContext.js';
import Home from './home.js';
import ChatWithPDF from './ChatWithPDF.js';

function App() {
  return (
    <Router>
      <QuizProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat-with-pdf" element={<ChatWithPDF />} />
        <Route path="/cs-quiz-topics" element={<CSQuizTopicSelector />} />
          <Route path="/quiz" element={<CSQuiz />} />
      </Routes>
      </QuizProvider>
    </Router>
  );
}

export default App;