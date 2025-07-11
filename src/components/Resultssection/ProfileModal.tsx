import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Linkedin, Facebook, Twitter, Eye, EyeOff, MapPin, Building, Globe, Calendar, Mail, Phone, User, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileModal = ({ isOpen, closeModal, profile, isDarkMode }) => {
  if (!profile) return null;

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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                <ProfileHeader profile={profile} closeModal={closeModal} isDarkMode={isDarkMode} />
                <div className="overflow-y-auto flex-1 min-h-0">
                  <ProfileBody profile={profile} isDarkMode={isDarkMode} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const ProfileHeader = ({ profile, closeModal, isDarkMode }) => (
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
        className="relative flex-shrink-0"
      >
        <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl ${
          isDarkMode 
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
            : 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white'
        }`}>
          {profile.name?.charAt(0) || 'U'}
        </div>
        <div className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-full border-4 ${
          isDarkMode ? 'border-gray-900 bg-green-500' : 'border-white bg-green-500'
        } shadow-lg`} />
      </motion.div>
      
      <div className="flex-1 min-w-0">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          {profile.name}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {profile.title}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center space-x-3"
        >
          <SocialButton icon={Linkedin} color="text-blue-500" isDarkMode={isDarkMode} />
          <SocialButton icon={Facebook} color="text-blue-600" isDarkMode={isDarkMode} />
          <SocialButton icon={Twitter} color="text-sky-500" isDarkMode={isDarkMode} />
        </motion.div>
      </div>
    </div>
  </div>
);

const SocialButton = ({ icon: Icon, color, isDarkMode }) => (
  <motion.button
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`p-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg ${
      isDarkMode ? 'bg-gray-800/50 hover:bg-gray-700/70' : 'bg-white/70 hover:bg-white/90'
    } backdrop-blur-sm`}
  >
    <Icon size={20} className={color} />
  </motion.button>
);

const ProfileBody = ({ profile, isDarkMode }) => (
  <div className="p-8 space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <CompanyInfo profile={profile} isDarkMode={isDarkMode} />
        <ProfileDetails profile={profile} isDarkMode={isDarkMode} />
      </div>
      <div className="space-y-6">
        <ContactDetails profile={profile} isDarkMode={isDarkMode} />
        <About profile={profile} isDarkMode={isDarkMode} />
      </div>
    </div>
    <EmploymentHistory profile={profile} isDarkMode={isDarkMode} />
  </div>
);

const CompanyInfo = ({ profile, isDarkMode }) => (
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
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-xl shadow-md ${
        isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
      }`}>
        <Building size={24} className="text-blue-500" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {profile.company}
        </h4>
        <div className="flex items-center space-x-2">
          <Globe size={16} className="text-gray-500 flex-shrink-0" />
          <p className={`text-sm truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {profile.website || 'No website'}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const ProfileDetails = ({ profile, isDarkMode }) => (
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
      <User size={20} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
      <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Details
      </h4>
    </div>
    <DetailItem 
      icon={MapPin} 
      label="Location" 
      value={profile.location || 'Not specified'} 
      isDarkMode={isDarkMode} 
    />
    <DetailItem 
      icon={Briefcase} 
      label="Industry" 
      value={profile.industry || 'Not specified'} 
      isDarkMode={isDarkMode} 
    />
    <DetailItem 
      icon={Calendar} 
      label="Experience" 
      value={profile.experience || 'Not specified'} 
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

const ContactDetails = ({ profile, isDarkMode }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const maskEmail = (email) => {
    if (!email) return 'Not provided';
    const [localPart, domain] = email.split('@');
    return `${localPart.slice(0, 2)}****@${domain.slice(0, 2)}****.com`;
  };

  const maskPhone = (phone) => {
    if (!phone) return 'Not provided';
    return `${phone.slice(0, 4)}*****`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-800/50 border border-gray-600/30' 
          : 'bg-gray-50/70 border border-gray-200/30'
      } backdrop-blur-sm space-y-4`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <Mail size={20} className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
        <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Contact Details
        </h4>
      </div>
      <ContactItem
        icon={Mail}
        label="Email"
        value={showEmail ? (profile.email || 'Not provided') : maskEmail(profile.email)}
        isVisible={showEmail}
        onToggle={() => setShowEmail(!showEmail)}
        isDarkMode={isDarkMode}
      />
      <ContactItem
        icon={Phone}
        label="Phone"
        value={showPhone ? (profile.phone || 'Not provided') : maskPhone(profile.phone)}
        isVisible={showPhone}
        onToggle={() => setShowPhone(!showPhone)}
        isDarkMode={isDarkMode}
      />
    </motion.div>
  );
};

const ContactItem = ({ icon: Icon, label, value, isVisible, onToggle, isDarkMode }) => (
  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-200 group">
    <div className="flex items-center space-x-3 flex-1 min-w-0">
      <div className={`p-2 rounded-lg ${
        isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
      }`}>
        <Icon size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {label}
        </p>
        <p className={`text-base font-medium truncate font-mono ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {value}
        </p>
      </div>
    </div>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className={`p-2.5 rounded-lg transition-all duration-200 ${
        isDarkMode 
          ? isVisible 
            ? 'bg-blue-500 text-white shadow-lg' 
            : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
          : isVisible 
            ? 'bg-blue-500 text-white shadow-lg' 
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
      }`}
    >
      {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
    </motion.button>
  </div>
);

const About = ({ profile, isDarkMode }) => (
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
      About
    </h4>
    <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      {profile.about || 'No additional information available.'}
    </p>
  </motion.div>
);

const EmploymentHistory = ({ profile, isDarkMode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.0 }}
    className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/50 border border-gray-600/30' 
        : 'bg-gray-50/70 border border-gray-200/30'
    } backdrop-blur-sm`}
  >
    <h4 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      Employment History
    </h4>
    <div className="flex items-start space-x-4">
      <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0 shadow-lg" />
      <div className="flex-1">
        <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Current Position
        </p>
        <p className={`text-base mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {profile.currentJob || profile.title || 'Not specified'}
        </p>
      </div>
    </div>
  </motion.div>
);

export default ProfileModal;