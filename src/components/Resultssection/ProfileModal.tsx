import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Linkedin, Facebook, Twitter, Eye, EyeOff, MapPin, Building, Globe, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileModal = ({ isOpen, closeModal, profile, isDarkMode }) => {
  if (!profile) return null;

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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-400"
              enterFrom="opacity-0 scale-90 translate-y-8"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-90 translate-y-8"
            >
              <Dialog.Panel className={`w-full max-w-2xl transform overflow-hidden rounded-3xl text-left align-middle shadow-2xl transition-all ${
                isDarkMode 
                  ? 'bg-gray-900/95 backdrop-blur-xl border border-gray-700/50' 
                  : 'bg-white/95 backdrop-blur-xl border border-gray-200/50'
              }`}>
                <ProfileHeader profile={profile} closeModal={closeModal} isDarkMode={isDarkMode} />
                <ProfileBody profile={profile} isDarkMode={isDarkMode} />
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
    
    <div className="flex items-start space-x-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold ${
          isDarkMode 
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
            : 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white'
        } shadow-lg`}>
          {profile.name?.charAt(0) || 'U'}
        </div>
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-3 ${
          isDarkMode ? 'border-gray-900 bg-green-500' : 'border-white bg-green-500'
        }`} />
      </motion.div>
      
      <div className="flex-1 pt-2">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          {profile.name}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}
        >
          {profile.title}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center space-x-4 mt-4"
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
    className={`p-2 rounded-xl ${
      isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-white/50 hover:bg-white/80'
    } transition-all duration-200 backdrop-blur-sm`}
  >
    <Icon size={20} className={color} />
  </motion.button>
);

const ProfileBody = ({ profile, isDarkMode }) => (
  <div className="p-8 space-y-8">
    <CompanyInfo profile={profile} isDarkMode={isDarkMode} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProfileDetails profile={profile} isDarkMode={isDarkMode} />
      <ContactDetails profile={profile} isDarkMode={isDarkMode} />
    </div>
    <About profile={profile} isDarkMode={isDarkMode} />
    <EmploymentHistory profile={profile} isDarkMode={isDarkMode} />
  </div>
);

const CompanyInfo = ({ profile, isDarkMode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className={`p-6 rounded-2xl ${
      isDarkMode 
        ? 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30' 
        : 'bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-200/30'
    } backdrop-blur-sm`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-xl ${
          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
        }`}>
          <Building size={20} className="text-blue-500" />
        </div>
        <div>
          <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {profile.company}
          </h4>
          <div className="flex items-center space-x-2 mt-1">
            <Globe size={14} className="text-gray-500" />
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {profile.website || 'No website'}
            </p>
          </div>
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
    className={`p-6 rounded-2xl ${
      isDarkMode 
        ? 'bg-gray-800/30 border border-gray-600/30' 
        : 'bg-gray-50/50 border border-gray-200/30'
    } backdrop-blur-sm space-y-4`}
  >
    <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
      Details
    </h4>
    <DetailItem 
      icon={MapPin} 
      label="Location" 
      value={profile.location || 'Not specified'} 
      isDarkMode={isDarkMode} 
    />
    <DetailItem 
      icon={Building} 
      label="Industry" 
      value={profile.industry || 'Not specified'} 
      isDarkMode={isDarkMode} 
    />
    <DetailItem 
      icon={Calendar} 
      label="Employees" 
      value={profile.employees || 'Not specified'} 
      isDarkMode={isDarkMode} 
    />
  </motion.div>
);

const DetailItem = ({ icon: Icon, label, value, isDarkMode }) => (
  <div className="flex items-center space-x-3">
    <div className={`p-1.5 rounded-lg ${
      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
    }`}>
      <Icon size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
    </div>
    <div>
      <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </p>
      <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
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
      className={`p-6 rounded-2xl ${
        isDarkMode 
          ? 'bg-gray-800/30 border border-gray-600/30' 
          : 'bg-gray-50/50 border border-gray-200/30'
      } backdrop-blur-sm`}
    >
      <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
        Contact Details
      </h4>
      <div className="space-y-4">
        <ContactItem
          label="Email"
          value={showEmail ? (profile.email || 'Not provided') : maskEmail(profile.email)}
          isVisible={showEmail}
          onToggle={() => setShowEmail(!showEmail)}
          isDarkMode={isDarkMode}
        />
        <ContactItem
          label="Phone"
          value={showPhone ? (profile.phone || 'Not provided') : maskPhone(profile.phone)}
          isVisible={showPhone}
          onToggle={() => setShowPhone(!showPhone)}
          isDarkMode={isDarkMode}
        />
      </div>
    </motion.div>
  );
};

const ContactItem = ({ label, value, isVisible, onToggle, isDarkMode }) => (
  <div className="flex items-center justify-between group">
    <div>
      <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </p>
      <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} font-mono`}>
        {value}
      </p>
    </div>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className={`p-2 rounded-lg transition-all duration-200 ${
        isDarkMode 
          ? isVisible 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
          : isVisible 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
      }`}
    >
      {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
    </motion.button>
  </div>
);

const About = ({ profile, isDarkMode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9 }}
    className={`p-6 rounded-2xl ${
      isDarkMode 
        ? 'bg-gray-800/30 border border-gray-600/30' 
        : 'bg-gray-50/50 border border-gray-200/30'
    } backdrop-blur-sm`}
  >
    <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
      About
    </h4>
    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      {profile.about || 'No additional information available.'}
    </p>
  </motion.div>
);

const EmploymentHistory = ({ profile, isDarkMode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.0 }}
    className={`p-6 rounded-2xl ${
      isDarkMode 
        ? 'bg-gray-800/30 border border-gray-600/30' 
        : 'bg-gray-50/50 border border-gray-200/30'
    } backdrop-blur-sm`}
  >
    <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
      Employment History
    </h4>
    <div className="flex items-start space-x-3">
      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0" />
      <div>
        <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Current Position
        </p>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
          {profile.currentJob || profile.title || 'Not specified'}
        </p>
      </div>
    </div>
  </motion.div>
);

export default ProfileModal;