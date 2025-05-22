// src/components/AnalysePage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUpload, FaSpinner, FaExclamationTriangle, FaFileAlt, FaComments } from 'react-icons/fa';
import { motion } from 'framer-motion';

function AnalysePage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please upload an X-ray image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/analyse/`, formData, {
        responseType: 'json',
      });
      setResult({
        ...response.data,
        original_image: `data:image/png;base64,${response.data.original_image}`,
        segmented_image: `data:image/png;base64,${response.data.segmented_image}`,
      });
    } catch (err) {
      console.error('Failed to analyse image:', err);
      setError('Failed to analyse image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReport = () => {
    navigate('/report', { state: result });
  };

  const handleChat = () => {
    navigate('/chatbot', { state: { predicted_class: result.predicted_class } });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Analyse Your Chest X-Ray
        </h1>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
          <div className="flex flex-col items-center">
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center w-full max-w-md p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full max-w-xs rounded-lg object-contain h-64" />
              ) : (
                <div className="text-center">
                  <FaUpload className="mx-auto text-4xl text-gray-500 dark:text-gray-400 mb-2" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Click to upload an X-ray image
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    (Supported formats: JPG, PNG)
                  </p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex items-center text-red-600 dark:text-red-400"
              >
                <FaExclamationTriangle className="mr-2" />
                <p>{error}</p>
              </motion.div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !image}
              className="mt-6 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? (
                <div className="flex items-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Analysing...
                </div>
              ) : (
                'Analyse X-Ray'
              )}
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 w-full max-w-md text-center"
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Analysis Result
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Predicted Condition: <span className="font-bold text-red-600 dark:text-red-400">{result.predicted_class}</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleReport}
                    className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaFileAlt className="mr-2" /> See Report
                  </button>
                  <button
                    onClick={handleChat}
                    className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaComments className="mr-2" /> Converse
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AnalysePage;
