import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Building, MapPin, Users, Calendar, Globe, Linkedin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const CompanyModal = ({ isOpen, closeModal, company, isDarkMode }) => {
  if (!company) return null;

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-400"
          enterFrom="opacity-0 backdrop-blur-none"
          enterTo="opacity-100 backdrop-blur-md"
          leave="ease-in duration-300"
          leaveFrom="opacity-100 backdrop-blur-md"
          leaveTo="opacity-0 backdrop-blur-none"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-400"
              enterFrom="opacity-0 scale-90 translate-y-8"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-90 translate-y-8"
            >
              <Dialog.Panel className={`w-full max-w-lg transform overflow-hidden rounded-3xl text-left align-middle shadow-2xl transition-all ${
                isDarkMode 
                  ? 'bg-gray-900/95 backdrop-blur-xl border border-gray-700/50' 
                  : 'bg-white/95 backdrop-blur-xl border border-gray-200/50'
              }`}>
                <CompanyHeader company={company} closeModal={closeModal} isDarkMode={isDarkMode} />
                <CompanyBody company={company} isDarkMode={isDarkMode} />
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
      ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90' 
      : 'bg-gradient-to-br from-blue-50/90 to-indigo-100/90'
  } p-8 backdrop-blur-sm`}>
    <motion.button
      whileHover={{ scale: 1.05, rotate: 90 }}
      whileTap={{ scale: 0.95 }}
      onClick={closeModal}
      className={`absolute top-6 right-6 p-2 rounded-full transition-all duration-200 ${
        isDarkMode 
          ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
          : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
      }`}
    >
      <X size={20} />
    </motion.button>
    
    <div className="flex items-start space-x-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
          isDarkMode 
            ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
            : 'bg-gradient-to-br from-blue-600 to-indigo-700'
        } shadow-lg`}
      >
        <Building size={28} className="text-white" />
      </motion.div>
      
      <div className="flex-1 pt-2">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          {company.name}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}
        >
          {company.industry || 'Technology'}
        </motion.p>
      </div>
    </div>
  </div>
);

const CompanyBody = ({ company, isDarkMode }) => (
  <div className="p-8 space-y-6">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <CompanyInfoCard
        icon={MapPin}
        label="Location"
        value={company.location || 'Not specified'}
        isDarkMode={isDarkMode}
      />
      <CompanyInfoCard
        icon={Users}
        label="Company Size"
        value={company.size || 'Not specified'}
        isDarkMode={isDarkMode}
      />
      <CompanyInfoCard
        icon={Calendar}
        label="Founded"
        value={company.founded || 'Not specified'}
        isDarkMode={isDarkMode}
      />
      <CompanyInfoCard
        icon={Building}
        label="Type"
        value={company.type || 'Private'}
        isDarkMode={isDarkMode}
      />
    </motion.div>

    {(company.website || company.linkedin) && (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`p-6 rounded-2xl ${
          isDarkMode 
            ? 'bg-gray-800/30 border border-gray-600/30' 
            : 'bg-gray-50/50 border border-gray-200/30'
        } backdrop-blur-sm`}
      >
        <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Online Presence
        </h4>
        <div className="space-y-3">
          {company.website && (
            <LinkItem
              icon={Globe}
              label="Website"
              value={company.website}
              href={company.website}
              isDarkMode={isDarkMode}
            />
          )}
          {company.linkedin && (
            <LinkItem
              icon={Linkedin}
              label="LinkedIn"
              value={company.linkedin}
              href={company.linkedin}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      </motion.div>
    )}
  </div>
);

const CompanyInfoCard = ({ icon: Icon, label, value, isDarkMode }) => (
  <motion.div 
    whileHover={{ scale: 1.02, y: -2 }}
    className={`p-4 rounded-xl ${
      isDarkMode 
        ? 'bg-gray-800/30 border border-gray-600/30' 
        : 'bg-gray-50/50 border border-gray-200/30'
    } backdrop-blur-sm transition-all duration-200`}
  >
    <div className="flex items-start space-x-3">
      <div className={`p-2 rounded-lg ${
        isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
      }`}>
        <Icon size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
      </div>
      <div className="flex-1">
        <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
          {label}
        </p>
        <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

const LinkItem = ({ icon: Icon, label, value, href, isDarkMode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.02 }}
    className={`flex items-center justify-between p-3 rounded-lg ${
      isDarkMode 
        ? 'bg-gray-700/30 hover:bg-gray-700/50' 
        : 'bg-gray-100/50 hover:bg-gray-100'
    } transition-all duration-200 group`}
  >
    <div className="flex items-center space-x-3">
      <Icon size={18} className="text-blue-500" />
      <div>
        <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {label}
        </p>
        <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} truncate max-w-[200px]`}>
          {value}
        </p>
      </div>
    </div>
    <ExternalLink size={16} className={`${
      isDarkMode ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-600'
    } transition-colors`} />
  </motion.a>
);

const CompanyFooter = ({ closeModal, isDarkMode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    className={`px-8 py-6 ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'
    } backdrop-blur-sm border-t ${
      isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
    }`}
  >
    <div className="flex justify-end space-x-3">
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
        View Details
      </motion.button>
    </div>
  </motion.div>
);

export default CompanyModal;