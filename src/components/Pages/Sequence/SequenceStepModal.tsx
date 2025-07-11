import React from 'react';
import { X, Mail, Phone, MessageSquare, Eye, UserPlus, Target, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SequenceStepModal = ({ isOpen, onClose, isDarkMode, onStepSelect }) => {
  if (!isOpen) return null;

  const stepTypes = [
    { 
      type: 'Automatic', 
      icon: Zap,
      description: 'Automated actions that execute without manual intervention',
      items: [
        { 
          icon: Mail, 
          title: 'Automatic email', 
          description: 'Emails are delivered automatically using AI personalization.', 
          aiAvailable: true,
          color: 'blue'
        }
      ] 
    },
    { 
      type: 'Manual Tasks', 
      icon: Target,
      description: 'Tasks that require human review and action',
      items: [
        { 
          icon: Mail, 
          title: 'Manual email', 
          description: 'Task is created to edit and deliver personalized email.', 
          aiAvailable: true,
          color: 'green'
        },
        { 
          icon: Phone, 
          title: 'Phone call', 
          description: 'Task is created to call prospect with talking points.',
          color: 'purple'
        },
        { 
          icon: MessageSquare, 
          title: 'Action item', 
          description: 'Task is created to perform custom follow-up action.',
          color: 'orange'
        }
      ]
    },
    { 
      type: 'LinkedIn Tasks', 
      icon: 'linkedin',
      description: 'Professional networking actions on LinkedIn',
      items: [
        { 
          icon: UserPlus, 
          title: 'LinkedIn - Send connection request', 
          description: 'Send personalized invitations to connect with contacts for a positive first impression.',
          color: 'blue'
        },
        { 
          icon: MessageSquare, 
          title: 'LinkedIn - Send message', 
          description: 'Send personalized direct messages to contacts you\'re connected with to build relationships.',
          color: 'blue'
        },
        { 
          icon: Eye, 
          title: 'LinkedIn - View profile', 
          description: 'View a contact\'s LinkedIn profile to gather key information for more effective engagement.',
          color: 'blue'
        },
        { 
          icon: Target, 
          title: 'LinkedIn - Interact with post', 
          description: 'View a contact\'s activities and interact with their recent posts to foster engagement.',
          color: 'blue'
        }
      ]
    }
  ];

  return (
    <AnimatePresence>
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
          className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
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
                    ? 'bg-gradient-to-br from-purple-500 to-pink-600' 
                    : 'bg-gradient-to-br from-purple-600 to-pink-700'
                } shadow-lg`}>
                  <Target size={24} className="text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Select a sequence step
                  </h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Choose the type of action to add to your sequence
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
          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="p-8">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`mb-8 text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Add a step for the sequence to follow and automate for you. Each step type offers different ways to engage with your prospects.
              </motion.p>

              <div className="space-y-8">
                {stepTypes.map((section, sectionIndex) => (
                  <motion.div 
                    key={sectionIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + sectionIndex * 0.1 }}
                    className={`p-6 rounded-2xl ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border border-gray-600/30' 
                        : 'bg-gray-50/50 border border-gray-200/30'
                    } backdrop-blur-sm`}
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      {section.icon === 'linkedin' ? (
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                          in
                        </div>
                      ) : (
                        <div className={`p-2.5 rounded-xl ${
                          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                        } shadow-md`}>
                          <section.icon size={20} className="text-blue-500" />
                        </div>
                      )}
                      <div>
                        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {section.type}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {section.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {section.items.map((item, itemIndex) => (
                        <StepItem
                          key={itemIndex}
                          item={item}
                          index={itemIndex}
                          onClick={() => onStepSelect(item)}
                          isDarkMode={isDarkMode}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const StepItem = ({ item, index, onClick, isDarkMode }) => {
  const Icon = item.icon;
  
  const getColorClasses = (color) => {
    const colorMap = {
      blue: isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      green: isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700',
      purple: isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
      orange: isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-700',
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800/50 border border-gray-600/30 hover:bg-gray-700/50' 
          : 'bg-white/70 border border-gray-200/30 hover:bg-white'
      } backdrop-blur-sm group`}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-xl ${getColorClasses(item.color)} shadow-md group-hover:shadow-lg transition-all`}>
          <Icon size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {item.title}
            </h4>
            {item.aiAvailable && (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30' 
                  : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200'
              }`}>
                AI Available
              </span>
            )}
          </div>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SequenceStepModal;