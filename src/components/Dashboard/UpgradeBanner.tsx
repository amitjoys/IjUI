// UpgradeBanner.tsx
import React from 'react';
import { CheckSquare, Search, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from '../Layout/SearchModal'; // Import the SearchModal component

const UpgradeBanner = ({ isDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const sparkleAnimation = {
    scale: [1, 1.2, 1],
    rotate: [0, 15, -15, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const backgroundAnimation = {
    background: [
      'radial-gradient(circle at 0% 0%, rgba(59,130,246,0.2) 0%, transparent 50%)',
      'radial-gradient(circle at 100% 100%, rgba(59,130,246,0.2) 0%, transparent 50%)',
      'radial-gradient(circle at 0% 100%, rgba(59,130,246,0.2) 0%, transparent 50%)',
      'radial-gradient(circle at 100% 0%, rgba(59,130,246,0.2) 0%, transparent 50%)',
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear"
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`${
          isDarkMode 
            ? 'bg-gradient-to-r from-gray-800 to-gray-900'
            : 'bg-gradient-to-r from-white to-blue-50'
        } p-4 rounded-lg shadow-sm mb-3 relative overflow-hidden`}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={backgroundAnimation}
        />

        {/* Floating particles */}
        <AnimatePresence>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full ${
                isDarkMode ? 'bg-blue-400' : 'bg-blue-300'
              }`}
              initial={{ 
                opacity: 0,
                x: Math.random() * 100,
                y: Math.random() * 100
              }}
              animate={{ 
                opacity: [0, 1, 0],
                x: Math.random() * 200,
                y: Math.random() * 200
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-6 relative z-10">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-bold mb-2 flex items-center">
                <motion.div animate={sparkleAnimation}>
                  <Sparkles className="text-blue-500 mr-2" size={18} />
                </motion.div>
                <motion.span
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Unlock Advanced AI Prospector
                </motion.span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="space-y-1"
            >
              {[
                { icon: CheckSquare, text: "Smart Natural Language Processing" },
                { icon: CheckSquare, text: "Advanced Data Filtering" },
                { icon: CheckSquare, text: "Instant Search Results" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.1 + 0.2 }}
                  whileHover={{ x: 5, transition: { duration: 0.1 } }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <feature.icon className="text-green-500" size={14} />
                  </motion.div>
                  <span className="text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col space-y-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className={`
                px-4 py-2 rounded-md font-medium text-sm
                flex items-center space-x-2
                ${isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'}
                transition-colors duration-150
              `}
              onClick={() => setIsModalOpen(true)}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Search size={16} />
              </motion.div>
              <span>AI Prospector</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className={`
                px-4 py-1.5 rounded-md font-medium text-sm
                ${isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}
                transition-colors duration-150
              `}
            >
              View All Features
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* SearchModal component */}
      <SearchModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default UpgradeBanner;