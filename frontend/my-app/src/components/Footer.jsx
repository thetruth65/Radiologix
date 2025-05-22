import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.footer 
      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-8 mt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div>
            <motion.h3 
              className="text-lg font-bold mb-4"
              variants={fadeIn}
            >
              Radiologix
            </motion.h3>
            <motion.p 
              className="text-sm"
              variants={fadeIn}
            >
              Empowering radiologists and healthcare professionals with AI-assisted chest X-ray analysis and interpretation.
            </motion.p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <motion.h3 
              className="text-lg font-bold mb-4"
              variants={fadeIn}
            >
              Quick Links
            </motion.h3>
            <motion.ul 
              className="space-y-2"
              variants={fadeIn}
            >
              <li>
                <Link to="/" className="text-sm hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-blue-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-blue-500 transition-colors">
                  Contact
                </Link>
              </li>
            </motion.ul>
          </div>
          
          {/* Column 3: Connect */}
          <div>
            <motion.h3 
              className="text-lg font-bold mb-4"
              variants={fadeIn}
            >
              Connect With Us
            </motion.h3>
            <motion.div 
              className="flex space-x-4"
              variants={fadeIn}
            >
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl hover:text-blue-500 transition-colors"
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl hover:text-blue-500 transition-colors"
              >
                <FaGithub />
              </a>
              <a 
                href="mailto:radilogix07@gmail.com" 
                className="text-xl hover:text-blue-500 transition-colors"
              >
                <FaEnvelope />
              </a>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="text-center pt-8 mt-8 border-t border-gray-200 dark:border-gray-700 text-sm"
          variants={fadeIn}
        >
          <p>&copy; {new Date().getFullYear()} Radiologix. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;