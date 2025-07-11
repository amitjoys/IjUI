import React from 'react';
import { Edit, MapPin, Mail, Phone, Calendar, User, Award, TrendingUp, Clock, CreditCard, Twitter, Github, Linkedin, Facebook, MessageSquare, Phone as PhoneIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = ({ isDarkMode }) => {
  const tasks = [
    { project: 'Email Credits', progress: 29.56, taskDone: '100%', time: '2 mins ago', icon: Mail, color: 'blue' },
    { project: 'Phone Credits', progress: 50, taskDone: '50%', time: '4 hrs ago', icon: Phone, color: 'green' },
    { project: 'Buyer Intent Topic Credits', progress: 39, taskDone: '39%', time: 'a min ago', icon: TrendingUp, color: 'purple' },
    { project: 'API Integration', progress: 78.03, taskDone: '78.03%', time: '2 weeks ago', icon: Award, color: 'orange' },
    { project: 'Others', progress: 100, taskDone: '100%', time: '18 hrs ago', icon: User, color: 'pink' },
  ];

  const paymentHistory = [
    { month: 'March', type: 'Pro Membership', percentage: 90, amount: '$25.00' },
    { month: 'February', type: 'Pro Membership', percentage: 90, amount: '$25.00' },
    { month: 'January', type: 'Pro Membership', percentage: 90, amount: '$25.00' },
  ];

  const cardDetails = [
    { type: 'American Express', expires: '12/2025', primary: false, last4: '1234' },
    { type: 'Mastercard', expires: '03/2025', primary: false, last4: '5678' },
    { type: 'Visa', expires: '10/2025', primary: true, last4: '9012' },
  ];

  const socialLinks = [
    { icon: Twitter, color: 'text-sky-500', bg: 'bg-sky-500' },
    { icon: PhoneIcon, color: 'text-red-500', bg: 'bg-red-500' },
    { icon: Github, color: 'text-gray-700', bg: 'bg-gray-700' },
    { icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-700' },
    { icon: MessageSquare, color: 'text-black', bg: 'bg-black' },
    { icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600' },
  ];

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Profile
          </h1>
          <p className={`text-lg mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`lg:col-span-1 ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } rounded-2xl shadow-xl p-8 backdrop-blur-sm border ${
              isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
            } hover:shadow-2xl transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Profile
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Edit size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
              </motion.button>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                  JT
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
              </div>
              
              <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Jimmy Turner
              </h3>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Web Developer
              </p>
              
              <div className="w-full space-y-4">
                <ProfileDetail icon={Calendar} label="DOB" value="Jan 20, 1989" isDarkMode={isDarkMode} />
                <ProfileDetail icon={MapPin} label="Location" value="New York, USA" isDarkMode={isDarkMode} />
                <ProfileDetail icon={Mail} label="Email" value="jimmy@gmail.com" isDarkMode={isDarkMode} />
                <ProfileDetail icon={Phone} label="Phone" value="+1 (530) 555-12121" isDarkMode={isDarkMode} />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {socialLinks.map((social, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 ${social.bg} rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200`}
                >
                  <social.icon size={20} />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Credits & Statistics Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Credits Utilization */}
            <div className={`${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } rounded-2xl shadow-xl p-8 backdrop-blur-sm border ${
              isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
            } hover:shadow-2xl transition-all duration-300`}>
              <div className="flex items-center space-x-3 mb-8">
                <div className={`p-3 rounded-xl ${
                  isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                } shadow-md`}>
                  <TrendingUp size={24} className="text-blue-500" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Credits Utilization
                  </h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Track your resource usage across all services
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tasks.map((task, index) => (
                  <CreditCard
                    key={index}
                    task={task}
                    index={index}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            </div>

            {/* Pro Plan & Payment History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pro Plan */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className={`${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-white'
                } rounded-2xl shadow-xl p-6 backdrop-blur-sm border ${
                  isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
                } hover:shadow-2xl transition-all duration-300`}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-3 rounded-xl ${
                    isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
                  } shadow-md`}>
                    <Award size={24} className="text-purple-500" />
                  </div>
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Pro Plan
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      10,000 Monthly Visitors
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Unlimited Reports
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      2 Years Data Storage
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      5 Days Left
                    </span>
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      $25 / month
                    </span>
                  </div>
                  <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
                    <div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full shadow-sm" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Renew Now
                </motion.button>
              </motion.div>

              {/* Payment History */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className={`${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-white'
                } rounded-2xl shadow-xl p-6 backdrop-blur-sm border ${
                  isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
                } hover:shadow-2xl transition-all duration-300`}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-3 rounded-xl ${
                    isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
                  } shadow-md`}>
                    <Clock size={24} className="text-green-500" />
                  </div>
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Payment History
                  </h2>
                </div>

                <div className="space-y-4">
                  {paymentHistory.map((payment, index) => (
                    <PaymentHistoryItem
                      key={index}
                      payment={payment}
                      index={index}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Card Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`${
                isDarkMode ? 'bg-gray-800/50' : 'bg-white'
              } rounded-2xl shadow-xl p-6 backdrop-blur-sm border ${
                isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
              } hover:shadow-2xl transition-all duration-300`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 rounded-xl ${
                  isDarkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                } shadow-md`}>
                  <CreditCard size={24} className="text-orange-500" />
                </div>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payment Methods
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cardDetails.map((card, index) => (
                  <CardItem
                    key={index}
                    card={card}
                    index={index}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ProfileDetail = ({ icon: Icon, label, value, isDarkMode }) => (
  <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-all duration-200">
    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
      <Icon size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
    </div>
    <div className="flex-1">
      <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </p>
      <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        {value}
      </p>
    </div>
  </div>
);

const CreditCard = ({ task, index, isDarkMode }) => {
  const Icon = task.icon;
  
  const getColorClasses = (color) => {
    const colorMap = {
      blue: isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600',
      green: isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600',
      purple: isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600',
      orange: isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600',
      pink: isDarkMode ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-600',
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-5 rounded-xl ${
        isDarkMode ? 'bg-gray-800/50 border border-gray-600/30' : 'bg-gray-50/50 border border-gray-200/30'
      } hover:shadow-lg transition-all duration-200`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-lg ${getColorClasses(task.color)}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {task.project}
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {task.time}
          </p>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Usage
          </span>
          <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {task.taskDone}
          </span>
        </div>
        <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full shadow-sm transition-all duration-300"
            style={{ width: `${task.progress}%` }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

const PaymentHistoryItem = ({ payment, index, isDarkMode }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`flex items-center justify-between p-4 rounded-xl ${
      isDarkMode ? 'bg-gray-800/50 border border-gray-600/30' : 'bg-gray-50/50 border border-gray-200/30'
    } hover:shadow-md transition-all duration-200`}
  >
    <div>
      <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {payment.month}
      </p>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {payment.type}
      </p>
    </div>
    <div className="text-right">
      <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {payment.amount}
      </p>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {payment.percentage}% used
      </p>
    </div>
  </motion.div>
);

const CardItem = ({ card, index, isDarkMode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    className={`p-4 rounded-xl ${
      isDarkMode ? 'bg-gray-800/50 border border-gray-600/30' : 'bg-gray-50/50 border border-gray-200/30'
    } hover:shadow-lg transition-all duration-200 ${
      card.primary ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
    }`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className={`w-12 h-8 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded-lg`}></div>
      {card.primary && (
        <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
          Primary
        </span>
      )}
    </div>
    <div>
      <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {card.type}
      </p>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        •••• {card.last4}
      </p>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Expires {card.expires}
      </p>
    </div>
  </motion.div>
);

export default ProfilePage;