import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const commonPrompts = [
  "Fetch me CEO from USA having 1000 employees in Helatchare sector",
  "Find 50 Senior React developers in India ",
  "Fetch Founders of 1000+ employees in USA in Manufacturing sector",
  "Fetch me Directors of Marketing and Sales of 10 to 50 employees in USA in Biotechnology sector",
];

const SearchModal = ({ isOpen, onClose, isDarkMode }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentQueries, setRecentQueries] = useState([]);

  useEffect(() => {
    // Load recent queries from localStorage on component mount
    const savedQueries = localStorage.getItem('recentQueries');
    if (savedQueries) {
      setRecentQueries(JSON.parse(savedQueries));
    }
  }, []);

  const handleSearch = async (searchQuery) => {
    setIsLoading(true);
    try {
      // Update recent queries
      const updatedQueries = [searchQuery, ...recentQueries.filter(q => q !== searchQuery)].slice(0, 5);
      setRecentQueries(updatedQueries);
      localStorage.setItem('recentQueries', JSON.stringify(updatedQueries));

      // Implement your NLP search logic here
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            className={`${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            } w-full max-w-2xl rounded-lg shadow-xl p-6`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">SmartJoy -An advanced Query in Natural Language</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6 flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
                placeholder="Ask anything about your data..."
                className={`flex-1 p-3 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
              />
              <button
                onClick={() => handleSearch(query)}
                disabled={!query.trim() || isLoading}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Search size={20} />
                Submit
              </button>
            </div>

            {recentQueries.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-2">Recent Queries</h3>
                <div className="flex flex-wrap gap-2">
                  {recentQueries.map((recentQuery) => (
                    <button
                      key={recentQuery}
                      onClick={() => {
                        setQuery(recentQuery);
                        handleSearch(recentQuery);
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {recentQuery}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Common Queries</h3>
              <div className="flex flex-wrap gap-2">
                {commonPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setQuery(prompt);
                      handleSearch(prompt);
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className={`max-h-64 overflow-y-auto ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              } rounded-lg p-4`}>
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 mb-2 rounded ${
                      isDarkMode ? 'bg-gray-600' : 'bg-white'
                    } shadow`}
                  >
                    <p>{result}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;