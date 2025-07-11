import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Building, MapPin, Users, Calendar, Globe, Linkedin, ExternalLink, TrendingUp, Mail, Phone, Award, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const CompanyModal = ({ isOpen, closeModal, company, isDarkMode }) => {
  if (!company) return null;

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full max-w-4xl max-h-[90vh] transform overflow-hidden rounded-2xl text-left align-middle shadow-2xl transition-all ${
                isDarkMode 
                  ? 'bg-gray-900/95 backdrop-blur-xl border border-gray-700/50' 
                  : 'bg-white/95 backdrop-blur-xl border border-gray-200/50'
              } flex flex-col`}>
                <CompanyHeader company={company} closeModal={closeModal} isDarkMode={isDarkMode} />
                <div className="overflow-y-auto flex-1 min-h-0">
                  <CompanyBody company={company} isDarkMode={isDarkMode} />
                </div>
                <CompanyFooter closeModal={closeModal} isDarkMode={isDarkMode} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const CompanyHeader = ({ company, closeModal, isDarkMode }) => (
  <div className={`relative ${
    isDarkMode 
      ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800' 
      : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
  } p-8 backdrop-blur-sm`}>
    <motion.button
      whileHover={{ scale: 1.05, rotate: 90 }}
      whileTap={{ scale: 0.95 }}
      onClick={closeModal}
      className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 hover:shadow-lg ${
        isDarkMode 
          ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
          : 'text-gray-500 hover:text-gray-700 hover:bg-white/80'
      }`}
    >
      <X size={20} />
    </motion.button>
    
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
            : 'bg-gradient-to-br from-blue-600 to-indigo-700'
        }`}
      >
        <Building size={32} className="text-white" />
      </motion.div>
      
      <div className="flex-1 min-w-0">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          {company.name}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {company.industry || 'Technology'}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-2"
        >
          <StatusBadge 
            icon={TrendingUp} 
            text="Growing" 
            color="green" 
            isDarkMode={isDarkMode} 
          />
          <StatusBadge 
            icon={Award} 
            text="Verified" 
            color="blue" 
            isDarkMode={isDarkMode} 
          />
        </motion.div>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ icon: Icon, text, color, isDarkMode }) => (
  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium ${
    color === 'green' 
      ? isDarkMode 
        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
        : 'bg-green-100 text-green-700 border border-green-200'
      : isDarkMode 
        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
        : 'bg-blue-100 text-blue-700 border border-blue-200'
  }`}>
    <Icon size={14} />
    <span>{text}</span>
  </div>
);

const CompanyBody = ({ company, isDarkMode }) => (
  <div className="p-8 space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <CompanyMetrics company={company} isDarkMode={isDarkMode} />
        <CompanyDetails company={company} isDarkMode={isDarkMode} />
      </div>
      <div className="space-y-6">
        <OnlinePresence company={company} isDarkMode={isDarkMode} />
        <CompanyInsights company={company} isDarkMode={isDarkMode} />
      </div>
    </div>
  </div>
);

const CompanyMetrics = ({ company, isDarkMode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800/80 to-gray-700/80 border border-gray-600/30' 
        : 'bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-200/30'
    } backdrop-blur-sm`}
  >
    <div className="flex items-center space-x-3 mb-6">
      <Target size={24} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
      <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Company Metrics
      </h4>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <MetricCard
        icon={Users}
        label="Company Size"
        value={company.size || '50-200'}
        isDarkMode={isDarkMode}
      />
      <MetricCard
        icon={Calendar}
        label="Founded"
        value={company.founded || '2010'}
        isDarkMode={isDarkMode}
      />
      <MetricCard
        icon={Building}
        label="Type"
        value={company.type || 'Private'}
        isDarkMode={isDarkMode}
      />
      <MetricCard
        icon={MapPin}
        label="HQ Location"
        value={company.location || 'San Francisco, CA'}
        isDarkMode={isDarkMode}
      />
    </div>
  </motion.div>
);

const MetricCard = ({ icon: Icon, label, value, isDarkMode }) => (
  <div className={`p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
    isDarkMode 
      ? 'bg-gray-800/50 border border-gray-600/30' 
      : 'bg-white/70 border border-gray-200/30'
  } backdrop-blur-sm`}>
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg ${
        isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
      }`}>
        <Icon size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {label}
        </p>
        <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {value}
        </p>
      </div>
    </div>
  </div>
);

const CompanyDetails = ({ company, isDarkMode }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.7 }}
    className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/50 border border-gray-600/30' 
        : 'bg-gray-50/70 border border-gray-200/30'
    } backdrop-blur-sm space-y-4`}
  >
    <div className="flex items-center space-x-3 mb-4">
      <Building size={20} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
      <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Company Details
      </h4>
    </div>
    
    <DetailItem 
      icon={Globe} 
      label="Domain" 
      value={company.domain || `${company.name?.toLowerCase().replace(/\s+/g, '')}.com`} 
      isDarkMode={isDarkMode} 
    />
    <DetailItem 
      icon={Phone} 
      label="Company Number" 
      value={company.companyNumber || '+1 (555) 123-4567'} 
      isDarkMode={isDarkMode} 
    />
    <DetailItem 
      icon={Mail} 
      label="Contact Email" 
      value={company.contactEmail || `contact@${company.name?.toLowerCase().replace(/\s+/g, '')}.com`} 
      isDarkMode={isDarkMode} 
    />
  </motion.div>
);

const DetailItem = ({ icon: Icon, label, value, isDarkMode }) => (
  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-200">
    <div className={`p-2 rounded-lg ${
      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
    }`}>
      <Icon size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </p>
      <p className={`text-base font-medium truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        {value}
      </p>
    </div>
  </div>
);

const OnlinePresence = ({ company, isDarkMode }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.8 }}
    className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/50 border border-gray-600/30' 
        : 'bg-gray-50/70 border border-gray-200/30'
    } backdrop-blur-sm`}
  >
    <div className="flex items-center space-x-3 mb-4">
      <Globe size={20} className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
      <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Online Presence
      </h4>
    </div>
    
    <div className="space-y-3">
      <LinkItem
        icon={Globe}
        label="Website"
        value={company.website || `https://${company.name?.toLowerCase().replace(/\s+/g, '')}.com`}
        href={company.website || `https://${company.name?.toLowerCase().replace(/\s+/g, '')}.com`}
        isDarkMode={isDarkMode}
      />
      <LinkItem
        icon={Linkedin}
        label="LinkedIn"
        value={company.linkedin || `linkedin.com/company/${company.name?.toLowerCase().replace(/\s+/g, '-')}`}
        href={company.linkedin || `https://linkedin.com/company/${company.name?.toLowerCase().replace(/\s+/g, '-')}`}
        isDarkMode={isDarkMode}
      />
    </div>
  </motion.div>
);

const LinkItem = ({ icon: Icon, label, value, href, isDarkMode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.02 }}
    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
      isDarkMode 
        ? 'bg-gray-700/30 hover:bg-gray-700/50' 
        : 'bg-gray-100/50 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center space-x-3 flex-1 min-w-0">
      <Icon size={18} className="text-blue-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {label}
        </p>
        <p className={`text-sm truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {value}
        </p>
      </div>
    </div>
    <ExternalLink size={16} className={`${
      isDarkMode ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-600'
    } transition-colors flex-shrink-0`} />
  </motion.a>
);

const CompanyInsights = ({ company, isDarkMode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9 }}
    className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/50 border border-gray-600/30' 
        : 'bg-gray-50/70 border border-gray-200/30'
    } backdrop-blur-sm`}
  >
    <h4 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      Company Insights
    </h4>
    <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      {company.description || 'A dynamic technology company focused on innovation and growth in the digital marketplace.'}
    </p>
  </motion.div>
);

const CompanyFooter = ({ closeModal, isDarkMode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.0 }}
    className={`px-8 py-6 ${
      isDarkMode ? 'bg-gray-800/50 border-t border-gray-700/50' : 'bg-gray-50/50 border-t border-gray-200/50'
    } backdrop-blur-sm`}
  >
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
      <div className="flex items-center space-x-2 text-sm">
        <div className={`w-2 h-2 rounded-full ${
          isDarkMode ? 'bg-green-400' : 'bg-green-500'
        }`} />
        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Company data last updated 2 hours ago
        </span>
      </div>
      
      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={closeModal}
          className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
            isDarkMode 
              ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/50' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          Close
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg"
        >
          View Full Profile
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default CompanyModal;