import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, Clock, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const commonPrompts = [
  "Fetch me CEO from USA having 1000 employees in Healthcare sector",
  "Find 50 Senior React developers in India",
  "Fetch Founders of 1000+ employees in USA in Manufacturing sector",
  "Fetch me Directors of Marketing and Sales of 10 to 50 employees in USA in Biotechnology sector",
];

const SearchModal = ({ isOpen, onClose, isDarkMode }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentQueries, setRecentQueries] = useState([]);

  useEffect(() => {
    const savedQueries = localStorage.getItem('recentQueries');
    if (savedQueries) {
      setRecentQueries(JSON.parse(savedQueries));
    }
  }, []);

  const handleSearch = async (searchQuery) => {
    setIsLoading(true);
    try {
      const updatedQueries = [searchQuery, ...recentQueries.filter(q => q !== searchQuery)].slice(0, 5);
      setRecentQueries(updatedQueries);
      localStorage.setItem('recentQueries', JSON.stringify(updatedQueries));

      const response = await fetch('/api/nlp-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${
              isDarkMode 
                ? 'bg-gray-900/95 border-gray-700/50' 
                : 'bg-white/95 border-gray-200/50'
            } w-full max-w-4xl rounded-3xl shadow-2xl backdrop-blur-xl border mx-4 overflow-hidden`}
          >
            {/* Header */}
            <div className={`${
              isDarkMode 
                ? 'bg-gradient-to-r from-gray-800/90 to-gray-900/90' 
                : 'bg-gradient-to-r from-blue-50/90 to-indigo-100/90'
            } px-8 py-6 backdrop-blur-sm border-b border-gray-200/20`}>
              <div className="flex justify-between items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className={`p-3 rounded-2xl ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                      : 'bg-gradient-to-br from-blue-600 to-indigo-700'
                  } shadow-lg`}>
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      SmartJoy AI
                    </h2>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Advanced Query in Natural Language
                    </p>
                  </div>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                  }`}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Search Input */}
            <div className="p-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className={`relative flex items-center ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-600/50' 
                    : 'bg-gray-50/50 border-gray-200/50'
                } border rounded-2xl p-4 backdrop-blur-sm`}>
                  <Search size={20} className={`${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  } mr-4`} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && query.trim() && handleSearch(query)}
                    placeholder="Ask anything about your data in natural language..."
                    className={`flex-1 bg-transparent ${
                      isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                    } focus:outline-none text-lg`}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSearch(query)}
                    disabled={!query.trim() || isLoading}
                    className={`ml-4 px-6 py-3 rounded-xl flex items-center space-x-2 ${
                      !query.trim() || isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                    } text-white font-medium transition-all duration-200 shadow-lg`}
                  >
                    {isLoading ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Zap size={18} />
                        <span>Submit</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Recent Queries */}
              {recentQueries.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Recent Queries
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {recentQueries.map((recentQuery, index) => (
                      <motion.button
                        key={recentQuery}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setQuery(recentQuery);
                          handleSearch(recentQuery);
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 border border-gray-600/50'
                            : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-700 border border-gray-200/50'
                        } backdrop-blur-sm`}
                      >
                        {recentQuery.length > 50 ? `${recentQuery.slice(0, 50)}...` : recentQuery}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Common Queries */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Try These Examples
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {commonPrompts.map((prompt, index) => (
                    <motion.button
                      key={prompt}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setQuery(prompt);
                        handleSearch(prompt);
                      }}
                      className={`p-4 rounded-2xl text-left transition-all duration-200 group ${
                        isDarkMode
                          ? 'bg-gray-800/30 hover:bg-gray-700/40 text-gray-300 border border-gray-600/30'
                          : 'bg-gray-50/30 hover:bg-gray-100/40 text-gray-700 border border-gray-200/30'
                      } backdrop-blur-sm`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium leading-relaxed">
                          {prompt}
                        </span>
                        <ArrowRight size={16} className={`${
                          isDarkMode ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-600'
                        } transition-colors ml-2 flex-shrink-0`} />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Results */}
              {(isLoading || results.length > 0) && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`rounded-2xl ${
                    isDarkMode 
                      ? 'bg-gray-800/30 border border-gray-600/30' 
                      : 'bg-gray-50/30 border border-gray-200/30'
                  } backdrop-blur-sm p-6`}
                >
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Search Results
                  </h3>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className={`w-8 h-8 border-2 ${
                          isDarkMode ? 'border-gray-600 border-t-blue-400' : 'border-gray-300 border-t-blue-500'
                        } rounded-full`}
                      />
                      <span className={`ml-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Processing your query...
                      </span>
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto space-y-3">
                      {results.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className={`p-4 rounded-xl ${
                            isDarkMode ? 'bg-gray-700/30' : 'bg-white/50'
                          } backdrop-blur-sm`}
                        >
                          <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {result}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;