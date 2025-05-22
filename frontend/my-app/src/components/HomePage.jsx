// src/components/HomePage.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Transforming Radiology with AI
        </h1>
        <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
          Advanced chest X-ray analysis powered by artificial intelligence for faster, more accurate diagnoses
        </p>
        <Link to="/analyse" className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg transition-transform hover:scale-105 shadow-lg">
          <span>Get Started</span>
          <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full"
      >
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">AI-Powered Analysis</h2>
          <p className="text-gray-600 dark:text-gray-300">Our state-of-the-art EfficientNet model analyzes chest X-rays with high accuracy, identifying potential issues in seconds.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Detailed Reports</h2>
          <p className="text-gray-600 dark:text-gray-300">Get comprehensive reports with visual heat map segmentation highlighting areas of concern in your X-ray images.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">AI Radiology Chatbot</h2>
          <p className="text-gray-600 dark:text-gray-300">Discuss your results with our specialized LLaMA 3.1-powered chatbot, trained specifically for radiology consultation.</p>
        </div>
      </motion.div>
      
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Trusted by Healthcare Professionals</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          Join the growing community of radiologists and healthcare providers using Radiologix to enhance diagnostic capabilities
        </p>
      </div>
    </div>
  );
}

export default HomePage;
