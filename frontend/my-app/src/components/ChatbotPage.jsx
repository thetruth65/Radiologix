// src/components/ChatbotPage.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaUser, FaSpinner, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // Get the location and navigation objects
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract predicted_class from location state
  const { predicted_class } = location.state || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chatbot with predicted_class from navigation state
  useEffect(() => {
    // If no predicted_class is available, redirect to analyse page
    if (!predicted_class) {
      navigate('/analyse');
      return;
    }

    // Initialize chatbot with the condition from navigation state
    const initMessage = `Your recent X-ray analysis detected **${predicted_class}**. I'm Radiologix, your AI radiology assistant. I'm here to provide information and support about this condition. Please ask any questions or let me know how I can assist you further.`;
    setMessages([{ 
      role: 'assistant', 
      content: initMessage, 
      timestamp: new Date().toISOString() 
    }]);
  }, [predicted_class, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage, timestamp: new Date().toISOString() }]);
    setLoading(true);

    try {
      // Updated to send predicted_class instead of analysis_id
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/chatbot/`, { 
        message: userMessage, 
        predicted_class 
      });
      
      if (response.data && response.data.response) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: response.data.response, timestamp: response.data.timestamp },
        ]);
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message. Please try again.');
      setLoading(false);
    }
  };

  const formatMessageContent = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700 dark:hover:text-blue-400"
          >
            {part}
          </a>
        );
      }
      return part.split('\n').map((line, lineIndex) => (
        <span key={`${index}-${lineIndex}`}>
          {line}
          {lineIndex < part.split('\n').length - 1 && <br />}
        </span>
      ));
    });
  };

  // Display error message if something goes wrong
  if (error) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <FaExclamationTriangle className="mx-auto h-12 w-12 text-red-600 dark:text-red-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">{error}</h3>
          <div className="mt-6">
            <Link
              to="/analyse"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500"
            >
              <FaArrowLeft className="mr-2" /> Return to Analysis
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center">Radiologix Chatbot</h1>
            <p className="text-sm text-blue-100 text-center mt-1">
              Discuss your {predicted_class} diagnosis
            </p>
          </div>

          <div className="p-6">
            <div
              className="h-[60vh] overflow-y-auto mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              ref={chatContainerRef}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                  variants={itemVariants}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.role === 'user' ? (
                        <FaUser className="mr-2" />
                      ) : (
                        <FaRobot className="mr-2" />
                      )}
                      <span className="font-semibold">
                        {message.role === 'user' ? 'You' : 'Radiologix'}
                      </span>
                    </div>
                    <p>{formatMessageContent(message.content)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  className="flex justify-start mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-200 dark:bg-gray-600 p-3 rounded-lg">
                    <FaSpinner className="animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about your condition..."
                className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <motion.button
                type="submit"
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={loading || !inputValue.trim()}
              >
                <FaPaperPlane />
              </motion.button>
            </form>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Disclaimer: This chatbot provides information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/analyse"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <FaArrowLeft className="mr-2" /> Back to Analysis
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatbotPage;
