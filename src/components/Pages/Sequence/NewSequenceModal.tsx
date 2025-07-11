import React, { useState } from 'react';
import { X, Users, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

const NewSequenceModal = ({ isOpen, onClose, isDarkMode, addSequence }) => {
  const [sequenceName, setSequenceName] = useState('');
  const [permissions, setPermissions] = useState('Team can view and use');
  const [schedule, setSchedule] = useState('Normal Business Hours');

  if (!isOpen) return null;

  const handleCreate = () => {
    if (sequenceName.trim()) {
      const newSequence = {
        id: generateUniqueId(),
        name: sequenceName,
        permissions,
        schedule
      };
      addSequence(newSequence);
      setSequenceName('');
      setPermissions('Team can view and use');
      setSchedule('Normal Business Hours');
      onClose();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden ${
          isDarkMode 
            ? 'bg-gray-900/95 border border-gray-700/50' 
            : 'bg-white/95 border border-gray-200/50'
        } backdrop-blur-xl`}
      >
        {/* Header */}
        <div className={`${
          isDarkMode 
            ? 'bg-gradient-to-r from-gray-800 to-gray-900' 
            : 'bg-gradient-to-r from-blue-50 to-indigo-100'
        } px-8 py-6 backdrop-blur-sm`}>
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className={`p-3 rounded-2xl ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                  : 'bg-gradient-to-br from-blue-600 to-indigo-700'
              } shadow-lg`}>
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  New Sequence
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Create a new automated sequence
                </p>
              </div>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className={`p-3 rounded-full transition-all duration-300 ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
            >
              <X size={20} />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`mb-8 text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Customize this sequence's name, permission settings, sending schedule, and more to get started.
          </motion.p>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className={`block text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Sequence Name
              </label>
              <input
                type="text"
                value={sequenceName}
                onChange={(e) => setSequenceName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 text-white border-gray-600/50 focus:border-blue-500 focus:bg-gray-800' 
                    : 'bg-gray-50/50 text-gray-900 border-gray-200/50 focus:border-blue-500 focus:bg-white'
                } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                placeholder="Enter sequence name..."
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className={`block text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Users size={18} className="inline mr-2" />
                Permissions
              </label>
              <select
                value={permissions}
                onChange={(e) => setPermissions(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 text-white border-gray-600/50 focus:border-blue-500 focus:bg-gray-800' 
                    : 'bg-gray-50/50 text-gray-900 border-gray-200/50 focus:border-blue-500 focus:bg-white'
                } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="Team can view and use">Team can view and use</option>
                <option value="Only I can view and use">Only I can view and use</option>
              </select>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className={`block text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Clock size={18} className="inline mr-2" />
                Schedule
              </label>
              <select
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 text-white border-gray-600/50 focus:border-blue-500 focus:bg-gray-800' 
                    : 'bg-gray-50/50 text-gray-900 border-gray-200/50 focus:border-blue-500 focus:bg-white'
                } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="Normal Business Hours">Normal Business Hours</option>
                <option value="Custom Schedule">Custom Schedule</option>
              </select>
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                You may edit or create new schedules <span className="text-blue-500 hover:underline cursor-pointer">here</span>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`p-6 rounded-2xl ${
                isDarkMode 
                  ? 'bg-gray-800/50 border border-gray-600/30' 
                  : 'bg-blue-50/50 border border-blue-200/30'
              } backdrop-blur-sm`}
            >
              <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Normal Business Hours
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                  <div key={day} className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {day}:
                    </span>
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      8 AM – 5 PM
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className={`px-8 py-6 ${
          isDarkMode ? 'bg-gray-800/50 border-t border-gray-700/50' : 'bg-gray-50/50 border-t border-gray-200/50'
        } backdrop-blur-sm`}>
          <div className="flex justify-end space-x-3">
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
              onClick={handleCreate}
              disabled={!sequenceName.trim()}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg ${
                sequenceName.trim() 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white' 
                  : 'bg-gray-400 text-gray-300 cursor-not-allowed'
              }`}
            >
              Create Sequence
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewSequenceModal;