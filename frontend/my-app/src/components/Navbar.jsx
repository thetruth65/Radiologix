
// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import ThemeToggler from './ThemeToggler';
import { useState } from 'react';
import { FaHome, FaInfoCircle, FaEnvelope, FaMicroscope } from 'react-icons/fa';

function Navbar({ theme, setTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight">Radiologix</span>
          </Link>
          
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <ThemeToggler theme={theme} setTheme={setTheme} />
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
              <FaHome /> <span>Home</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
              <FaInfoCircle /> <span>About</span>
            </Link>
            <Link to="/contact" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
              <FaEnvelope /> <span>Contact</span>
            </Link>
            <Link to="/analyse" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
              <FaMicroscope /> <span>Analyse</span>
            </Link>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-3">
            <ThemeToggler theme={theme} setTheme={setTheme} />
            <Link 
              to="/" 
              className="block py-2 hover:bg-blue-700 dark:hover:bg-gray-700 px-2 rounded transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <FaHome /> <span>Home</span>
              </div>
            </Link>
            <Link 
              to="/about" 
              className="block py-2 hover:bg-blue-700 dark:hover:bg-gray-700 px-2 rounded transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <FaInfoCircle /> <span>About</span>
              </div>
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 hover:bg-blue-700 dark:hover:bg-gray-700 px-2 rounded transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <FaEnvelope /> <span>Contact</span>
              </div>
            </Link>
            <Link 
              to="/analyse" 
              className="block py-2 hover:bg-blue-700 dark:hover:bg-gray-700 px-2 rounded transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <FaMicroscope /> <span>Analyse</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
