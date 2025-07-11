import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, Clock, ArrowRight, Zap } from 'lucide-react';
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
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedQueries = localStorage.getItem('recentQueries');
    if (savedQueries) {
      setRecentQueries(JSON.parse(savedQueries));
    }
  }, []);

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const updatedQueries = [searchQuery, ...recentQueries.filter(q => q !== searchQuery)].slice(0, 5);
      setRecentQueries(updatedQueries);
      localStorage.setItem('recentQueries', JSON.stringify(updatedQueries));

      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResults = [
        `Found ${Math.floor(Math.random() * 100 + 10)} potential leads matching your criteria`,
        `Analyzing ${Math.floor(Math.random() * 50 + 5)} companies in your target segment`,
        `Enriching contact information for ${Math.floor(Math.random() * 75 + 15)} prospects`,
        `Preparing personalized outreach sequences for identified leads`
      ];
      
      setResults(mockResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate responsive modal size
  const getModalSize = () => {
    const isMobile = windowSize.width < 768;
    const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
    
    if (isMobile) {
      return 'w-[95vw] max-w-none max-h-[90vh]';
    } else if (isTablet) {
      return 'w-[85vw] max-w-2xl max-h-[85vh]';
    } else {
      return 'w-[80vw] max-w-4xl max-h-[80vh]';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ 
              scale: 0.8, 
              y: 50, 
              opacity: 0,
              rotateX: -15 
            }}
            animate={{ 
              scale: 1, 
              y: 0, 
              opacity: 1,
              rotateX: 0 
            }}
            exit={{ 
              scale: 0.8, 
              y: 50, 
              opacity: 0,
              rotateX: 15 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.4
            }}
            className={`${getModalSize()} ${
              isDarkMode 
                ? 'bg-gray-900/95 border-gray-700/50' 
                : 'bg-white/95 border-gray-200/50'
            } rounded-3xl shadow-2xl backdrop-blur-xl border overflow-hidden relative`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"
              animate={{
                background: [
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)',
                  'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%)',
                  'linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(147, 51, 234, 0.05) 100%)',
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Header */}
            <div className={`${
              isDarkMode 
                ? 'bg-gradient-to-r from-gray-800/90 to-gray-900/90' 
                : 'bg-gradient-to-r from-blue-50/90 to-indigo-100/90'
            } px-6 py-4 backdrop-blur-sm border-b border-gray-200/20 relative z-10`}>
              <div className="flex justify-between items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-center space-x-3"
                >
                  <motion.div 
                    className={`p-3 rounded-2xl ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                        : 'bg-gradient-to-br from-blue-600 to-indigo-700'
                    } shadow-lg`}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <Sparkles size={20} className="text-white" />
                  </motion.div>
                  <div>
                    <motion.h2 
                      className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                      animate={{
                        background: isDarkMode 
                          ? ['linear-gradient(45deg, #ffffff, #e5e7eb)', 'linear-gradient(45deg, #e5e7eb, #ffffff)']
                          : ['linear-gradient(45deg, #1f2937, #374151)', 'linear-gradient(45deg, #374151, #1f2937)']
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      SmartJoy AI
                    </motion.h2>
                    <motion.p 
                      className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Advanced Query in Natural Language
                    </motion.p>
                  </div>
                </motion.div>
                <motion.button
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 180,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                  }`}
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(100vh-8rem)] relative z-10">
              <div className="p-6">
                {/* Search Input */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mb-6"
                >
                  <div className={`relative flex items-center ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-600/50' 
                      : 'bg-gray-50/50 border-gray-200/50'
                  } border rounded-2xl p-4 backdrop-blur-sm group hover:shadow-lg transition-all duration-300`}>
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <Search size={20} className={`${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      } mr-4`} />
                    </motion.div>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isLoading && query.trim() && handleSearch(query)}
                      placeholder="Ask anything about your data in natural language..."
                      className={`flex-1 bg-transparent ${
                        isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                      } focus:outline-none text-base`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSearch(query)}
                      disabled={!query.trim() || isLoading}
                      className={`ml-4 px-6 py-3 rounded-xl flex items-center space-x-2 ${
                        !query.trim() || isLoading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                      } text-white font-medium transition-all duration-300`}
                    >
                      {isLoading ? (
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <motion.div
                          className="flex items-center space-x-2"
                          whileHover={{ x: 2 }}
                        >
                          <Zap size={18} />
                          <span>Submit</span>
                        </motion.div>
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Recent Queries */}
                {recentQueries.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mb-6"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Clock size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                      <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Recent Queries
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentQueries.map((recentQuery, index) => (
                        <motion.button
                          key={recentQuery}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * index, duration: 0.3 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setQuery(recentQuery);
                            handleSearch(recentQuery);
                          }}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isDarkMode
                              ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 border border-gray-600/50'
                              : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-700 border border-gray-200/50'
                          } backdrop-blur-sm hover:shadow-md`}
                        >
                          {recentQuery.length > 40 ? `${recentQuery.slice(0, 40)}...` : recentQuery}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Common Queries */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mb-6"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                    <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Try These Examples
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {commonPrompts.map((prompt, index) => (
                      <motion.button
                        key={prompt}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index + 0.3, duration: 0.4 }}
                        whileHover={{ 
                          scale: 1.02, 
                          y: -3,
                          boxShadow: isDarkMode 
                            ? "0 10px 25px rgba(0, 0, 0, 0.3)" 
                            : "0 10px 25px rgba(0, 0, 0, 0.1)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setQuery(prompt);
                          handleSearch(prompt);
                        }}
                        className={`p-4 rounded-xl text-left transition-all duration-300 group ${
                          isDarkMode
                            ? 'bg-gray-800/30 hover:bg-gray-700/40 text-gray-300 border border-gray-600/30'
                            : 'bg-gray-50/30 hover:bg-gray-100/40 text-gray-700 border border-gray-200/30'
                        } backdrop-blur-sm`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium leading-relaxed">
                            {prompt}
                          </span>
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight size={16} className={`${
                              isDarkMode ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-600'
                            } transition-colors ml-2 flex-shrink-0`} />
                          </motion.div>
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
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className={`rounded-2xl ${
                      isDarkMode 
                        ? 'bg-gray-800/30 border border-gray-600/30' 
                        : 'bg-gray-50/30 border border-gray-200/30'
                    } backdrop-blur-sm p-4`}
                  >
                    <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                      Search Results
                    </h3>
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className={`w-6 h-6 border-2 ${
                            isDarkMode ? 'border-gray-600 border-t-blue-400' : 'border-gray-300 border-t-blue-500'
                          } rounded-full`}
                        />
                        <span className={`ml-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Processing your query...
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {results.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.3 }}
                            className={`p-3 rounded-lg ${
                              isDarkMode ? 'bg-gray-700/30' : 'bg-white/50'
                            } backdrop-blur-sm`}
                          >
                            <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                              {result}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;