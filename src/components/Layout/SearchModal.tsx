import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const commonPrompts = [
  "Fetch me CEO from USA having 1000 employees in Healthcare sector",
  "Find 50 Senior React developers in India",
  "Fetch Founders of 1000+ employees in USA in Manufacturing sector",
  "Fetch me Directors of Marketing and Sales of 10 to 50 employees in USA in Biotechnology sector",
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsProcessing(true);
    setQuery(searchQuery);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Close modal after processing
    setIsProcessing(false);
    onClose();
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
    handleSubmit(example);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 bottom-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">SmartJoy AI</h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Advanced Query in Natural Language
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Search Input */}
              <div className="mb-6">
                <div className={`flex items-center ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-gray-50 border-gray-200'
                } border rounded-xl p-4`}>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isProcessing && handleSubmit(query)}
                    placeholder="Ask anything about your data in natural language..."
                    className={`flex-1 bg-transparent ${
                      isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                    } focus:outline-none`}
                    disabled={isProcessing}
                  />
                  <button
                    onClick={() => handleSubmit(query)}
                    disabled={!query.trim() || isProcessing}
                    className={`ml-4 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      !query.trim() || isProcessing
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white text-sm font-medium`}
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles size={16} />
                        <span>Submit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Examples */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <h3 className="font-semibold">Try These Examples</h3>
                </div>
                <div className="space-y-3">
                  {commonPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(prompt)}
                      disabled={isProcessing}
                      className={`w-full text-left p-4 rounded-xl transition-colors ${
                        isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{prompt}</span>
                        <svg 
                          className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;