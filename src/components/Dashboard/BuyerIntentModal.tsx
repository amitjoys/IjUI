import React, { useState } from 'react';
import { X, ChevronRight, ChevronDown, Search, Tag, TrendingUp, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BuyerIntentModal = ({ isOpen, onClose, isDarkMode }) => {
  const [selectedTopics, setSelectedTopics] = useState([
    { name: 'Power Digital Marketing', count: 13 },
    { name: 'Digital Marketing Services', count: 3400 },
    { name: 'Automotive Digital Marketing', count: 1900 }
  ]);
  const [expandedTopics, setExpandedTopics] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const topics = [
    'Programming Languages',
    'Developers',
    'Development Software',
    'Controls & Standards',
    'Media & Advertising',
    'Business Services',
    'HR Services',
    'Technology',
    'Personal Computer',
    'Financial Software',
    'Others',
    'Software Engineering'
  ];

  const filteredTopics = topics.filter(topic => 
    topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTopic = (topic) => {
    setExpandedTopics(prev => ({ ...prev, [topic]: !prev[topic] }));
  };

  const handleTopicToggle = (topic) => {
    setSelectedTopics(prev =>
      prev.some(t => t.name === topic)
        ? prev.filter(t => t.name !== topic)
        : [...prev, { name: topic, count: Math.floor(Math.random() * 1000) }]
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`w-11/12 max-w-6xl h-5/6 ${
            isDarkMode 
              ? 'bg-gray-900/95 border border-gray-700/50' 
              : 'bg-white/95 border border-gray-200/50'
          } rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl`}
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
                className="flex items-center space-x-4"
              >
                <div className={`p-3 rounded-2xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-purple-500 to-pink-600' 
                    : 'bg-gradient-to-br from-purple-600 to-pink-700'
                } shadow-lg`}>
                  <Target size={24} className="text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Intent Topic Settings
                  </h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Configure buyer intent signals for better targeting
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
                <X size={24} />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex">
            {/* Left Panel - Topic Selection */}
            <div className="w-2/3 p-8 overflow-y-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Tag size={20} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
                  <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Topics of Interest
                  </h3>
                </div>
                
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  Capture an intent signal if someone at a company engages with any of these topics. 
                  Select the topics most relevant to your business objectives.
                </p>

                {/* Search Bar */}
                <div className={`relative mb-6 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-600/50' 
                    : 'bg-gray-50/50 border-gray-200/50'
                } border rounded-2xl p-4 backdrop-blur-sm`}>
                  <Search size={18} className={`absolute left-6 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 pr-4 bg-transparent ${
                      isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                    } focus:outline-none`}
                  />
                </div>

                {/* Topics List */}
                <div className="space-y-3">
                  {filteredTopics.map((topic, index) => (
                    <TopicItem
                      key={topic}
                      topic={topic}
                      index={index}
                      isExpanded={expandedTopics[topic]}
                      isSelected={selectedTopics.some(t => t.name === topic)}
                      onToggleExpand={() => toggleTopic(topic)}
                      onToggleSelect={() => handleTopicToggle(topic)}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </div>

                {filteredTopics.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    <Search size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No topics found matching your search.</p>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Right Panel - Selected Topics */}
            <div className={`w-1/3 p-8 ${
              isDarkMode ? 'bg-gray-800/30 border-l border-gray-700/50' : 'bg-gray-50/30 border-l border-gray-200/50'
            } backdrop-blur-sm overflow-y-auto`}>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp size={20} className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Selected Topics
                  </h3>
                </div>

                <div className={`p-4 rounded-2xl mb-6 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30' 
                    : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Selected ({selectedTopics.length}/3)
                    </span>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                    }`}>
                      5.2K companies
                    </div>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Net new companies discovered
                  </p>
                </div>

                <div className="space-y-3">
                  <AnimatePresence>
                    {selectedTopics.map((topic, index) => (
                      <SelectedTopicCard
                        key={topic.name}
                        topic={topic}
                        index={index}
                        onRemove={() => handleTopicToggle(topic.name)}
                        isDarkMode={isDarkMode}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {selectedTopics.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-center py-12 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
                  >
                    <Target size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm">No topics selected yet.</p>
                    <p className="text-xs mt-1">Choose topics from the left panel.</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <div className={`px-8 py-6 ${
            isDarkMode ? 'bg-gray-800/50 border-t border-gray-700/50' : 'bg-gray-50/50 border-t border-gray-200/50'
          } backdrop-blur-sm`}>
            <div className="flex justify-end space-x-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose} 
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/50' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg"
              >
                Save Settings
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const TopicItem = ({ topic, index, isExpanded, isSelected, onToggleExpand, onToggleSelect, isDarkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className={`rounded-2xl transition-all duration-200 ${
      isDarkMode 
        ? 'bg-gray-800/30 border border-gray-600/30 hover:bg-gray-700/40' 
        : 'bg-gray-50/50 border border-gray-200/30 hover:bg-gray-100/50'
    } backdrop-blur-sm overflow-hidden`}
  >
    <div className="p-4">
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onToggleExpand}
          className="flex items-center space-x-3 flex-1 text-left"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
          </motion.div>
          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {topic}
          </span>
        </motion.button>
        
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
            }`}
          >
            Selected
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 ml-7 space-y-3">
              <SubtopicItem
                id={topic}
                label={`${topic} Subtopic 1`}
                checked={isSelected}
                onChange={onToggleSelect}
                isDarkMode={isDarkMode}
              />
              <SubtopicItem
                id={`${topic}-2`}
                label={`${topic} Subtopic 2`}
                checked={false}
                onChange={() => {}}
                isDarkMode={isDarkMode}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

const SubtopicItem = ({ id, label, checked, onChange, isDarkMode }) => (
  <motion.label
    whileHover={{ scale: 1.02 }}
    htmlFor={id}
    className="flex items-center space-x-3 cursor-pointer group"
  >
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
        checked
          ? 'bg-purple-500 border-purple-500'
          : isDarkMode
          ? 'border-gray-500 bg-gray-700'
          : 'border-gray-300 bg-white'
      }`}
    />
    <span className={`text-sm ${
      isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
    } transition-colors`}>
      {label}
    </span>
  </motion.label>
);

const SelectedTopicCard = ({ topic, index, onRemove, isDarkMode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, x: 20 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    exit={{ opacity: 0, scale: 0.8, x: 20 }}
    transition={{ delay: index * 0.1 }}
    className={`p-4 rounded-2xl transition-all duration-200 group ${
      isDarkMode 
        ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30' 
        : 'bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200'
    }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <h4 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>
          {topic.name}
        </h4>
        <div className="flex items-center space-x-2 mt-1">
          <div className={`px-2 py-0.5 rounded text-xs font-medium ${
            isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-200 text-purple-700'
          }`}>
            {topic.count.toLocaleString()}
          </div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            companies
          </span>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRemove}
        className={`p-1.5 rounded-full transition-all duration-200 ${
          isDarkMode 
            ? 'text-gray-400 hover:text-white hover:bg-red-500/20' 
            : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
        }`}
      >
        <X size={14} />
      </motion.button>
    </div>
  </motion.div>
);

export default BuyerIntentModal;