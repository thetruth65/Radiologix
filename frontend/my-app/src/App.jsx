
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import AnalysePage from './components/AnalysePage';
import ReportPage from './components/ReportPage';
import ChatbotPage from './components/ChatbotPage';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <div className={theme}>
      <Router>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/analyse" element={<AnalysePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

