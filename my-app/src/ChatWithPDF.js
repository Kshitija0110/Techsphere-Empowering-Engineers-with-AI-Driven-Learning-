import React, { useState, useRef, useEffect } from 'react';
import { MessageCircleIcon, BookOpenIcon, UploadIcon, SendIcon, ThermometerIcon } from 'lucide-react';

function ChatWithPDF() {
  const [messages, setMessages] = useState([
    { text: 'Hello! Upload a PDF and ask me questions about it.', isUser: false }
  ]);
  const [temperature, setTemperature] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const API_URL = 'http://localhost:7860';

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const handleSubmitTemperature = async () => {
    try {
      const response = await fetch(`${API_URL}/settemperature`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ temperature: parseFloat(temperature) })
      });
      
      const data = await response.json();
      
      if (data.error) {
        alert('Error setting temperature: ' + data.error);
      } else {
        alert('Temperature set to ' + temperature);
      }
    } catch (error) {
      console.error('Error setting temperature:', error);
      alert('Error setting temperature. See console for details.');
    }
  };

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];
    
    if (!file) {
      alert('Please select a PDF file first.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading and processing your PDF...');
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Upload the PDF
      const uploadResponse = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      
      const uploadData = await uploadResponse.json();
      
      if (uploadData.error) {
        setUploadStatus(`Error: ${uploadData.error}`);
        setIsUploading(false);
        return;
      }
      
      setUploadStatus('PDF processed successfully!');
      setCurrentCollection(uploadData.collection_name);
      
      // Set the collection name in the backend
      const collectionResponse = await fetch(`${API_URL}/db_collection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ collection_name: uploadData.collection_name })
      });
      
      const collectionData = await collectionResponse.json();
      
      if (collectionData && collectionData.message) {
        console.log(collectionData.message);
        // Add a message to chat
        addBotMessage(`I've processed your document "${uploadData.collection_name}". You can now ask questions about it!`);
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setUploadStatus('Error uploading PDF. See console for details.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    const message = userInput.trim();
    
    if (message === '') return;
    
    if (!currentCollection) {
      addBotMessage('Please upload a PDF document first.');
      setUserInput('');
      return;
    }
    
    // Add user message to chat
    addUserMessage(message);
    setUserInput('');
    
    // Show loading indicator
    setIsQuerying(true);
    
    try {
      const response = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: message,
          history: chatHistory
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        addBotMessage(`Error: ${data.error}`);
      } else {
        // Add bot response to chat
        const cleanAnswer = data.answer.replace(/(Source:.*)/, '');
        addBotMessage(cleanAnswer, data.source);
        
        // Update chat history
        const newHistory = [
          ...chatHistory,
          {
            human: message,
            assistant: data.answer
          }
        ];
        setChatHistory(newHistory);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addBotMessage('Error processing your request. Please try again.');
    } finally {
      setIsQuerying(false);
    }
  };

  const addUserMessage = (text) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { text, isUser: true }
    ]);
  };

  const addBotMessage = (text, source = null) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { text, isUser: false, source }
    ]);
  };

  // Test connection to the backend on component mount
  useEffect(() => {
    fetch(`${API_URL}/send`)
      .then(response => response.json())
      .then(data => {
        console.log('Connected to backend:', data);
      })
      .catch(error => {
        console.error('Error connecting to backend:', error);
        addBotMessage('Error connecting to backend server. Please make sure the Flask application is running.');
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6 space-x-2">
          <BookOpenIcon className="text-purple-400" size={28} />
          <h1 className="text-3xl font-bold">Textbook <span className="text-purple-400">Assistant</span></h1>
        </div>
        
        {/* Temperature Control */}
        {/* <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
          <div className="flex items-center">
            <ThermometerIcon className="text-blue-400 mr-2" size={20} />
            <h2 className="text-lg font-semibold mr-4">AI Temperature:</h2>
            <input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={handleTemperatureChange}
              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 w-20 text-white mr-4"
            />
            <button
              onClick={handleSubmitTemperature}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg transition-colors"
            >
              Set Temperature
            </button>
            <p className="ml-4 text-sm text-gray-400">
              (Lower values = more focused, Higher values = more creative)
            </p>
          </div>
        </div> */}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PDF Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 h-full">
              <div className="flex items-center mb-4">
                <UploadIcon className="text-purple-400 mr-2" size={20} />
                <h2 className="text-xl font-bold">Upload Your PDF</h2>
              </div>
              
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center mb-4 hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf"
                  className="hidden"
                  id="pdf-upload"
                  disabled={isUploading}
                />
                <label 
                  htmlFor="pdf-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <UploadIcon className="text-purple-400 mb-2" size={40} />
                  <span className="text-purple-400 font-semibold">Choose a PDF file</span>
                  <span className="text-sm text-gray-400 mt-2">or drag and drop it here</span>
                </label>
              </div>
              
              <div className="mb-4 text-sm text-gray-300">
                {fileInputRef.current?.files[0]?.name && (
                  <div className="p-2 bg-gray-700 rounded">
                    Selected: {fileInputRef.current.files[0].name}
                  </div>
                )}
              </div>
              
              <button
                onClick={handleFileUpload}
                disabled={isUploading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center transition-colors"
              >
                {isUploading ? (
                  <span>Processing...</span>
                ) : (
                  <span className="flex items-center">
                    <UploadIcon className="mr-2" size={16} />
                    Upload & Process
                  </span>
                )}
              </button>
              
              {uploadStatus && (
                <div className={`mt-4 p-3 rounded text-sm ${
                  uploadStatus.includes('Error') 
                    ? 'bg-red-900/30 text-red-300' 
                    : uploadStatus.includes('successfully') 
                      ? 'bg-green-900/30 text-green-300'
                      : 'bg-blue-900/30 text-blue-300'
                }`}>
                  {uploadStatus}
                </div>
              )}
            </div>
          </div>
          
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 border border-gray-700 rounded-xl h-full flex flex-col">
              <div className="p-4 border-b border-gray-700 flex items-center">
                <MessageCircleIcon className="text-purple-400 mr-2" size={20} />
                <h2 className="text-xl font-bold">Chat with your PDF</h2>
              </div>
              
              <div className="flex-1 p-4 overflow-auto max-h-[500px]">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.isUser 
                        ? 'flex justify-end' 
                        : 'flex justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isUser
                          ? 'bg-purple-600 text-white rounded-tr-none'
                          : 'bg-gray-700 text-gray-200 rounded-tl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                      {message.source && (
                        <div className="text-xs mt-2 opacity-70">
                          Source: {message.source}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {isQuerying && (
                <div className="px-4 py-2 text-sm italic text-gray-400 text-center">
                  Processing your request...
                </div>
              )}
              
              <div className="p-4 border-t border-gray-700">
                <div className="flex">
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleUserInput}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      currentCollection
                        ? "Ask a question about your PDF..."
                        : "Please upload a PDF first..."
                    }
                    disabled={!currentCollection || isQuerying}
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!currentCollection || isQuerying}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg flex items-center transition-all"
                  >
                    <SendIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWithPDF;