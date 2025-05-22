// src/components/ReportPage.jsx
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function ReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state;

  if (!report) {
    // If no report data, redirect to analyse page
    navigate('/analyse');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center">
              Radiologix Chest X-Ray Report
            </h1>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col items-center mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    Original X-Ray
                  </h2>
                  <div className="flex justify-center">
                    <img 
                      src={report.original_image} 
                      alt="Chest X-Ray" 
                      className="w-full max-w-sm rounded-lg shadow-sm object-contain h-64"
                    />
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    Segmented Image
                  </h2>
                  <div className="flex justify-center">
                    <img 
                      src={report.segmented_image} 
                      alt="Segmented X-Ray" 
                      className="w-full max-w-sm rounded-lg shadow-sm object-contain h-64" 
                    />
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center mt-8 text-red-600 dark:text-red-400">
                {report.predicted_class}
              </h2>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Disclaimer: This report was generated using AI and is intended for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
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
    </div>
  );
}

export default ReportPage;
