import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AlertCircle, ChevronRight, Globe, Plus, RefreshCw, CheckCircle, XCircle, Copy, Code, ExternalLink, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateTrackingSetup, initializeTracking } from './tracking';

const WebsiteTrackingModal = ({ isOpen, onClose, isDarkMode, onWebsitesAdded }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [websites, setWebsites] = useState([]);
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [validationStatus, setValidationStatus] = useState({ valid: false, issues: [] });
  const [copiedScriptIndex, setCopiedScriptIndex] = useState(null);

  const steps = [
    {
      title: 'Check Tracking Status',
      description: 'Verify if website tracking is enabled for your account',
      icon: CheckCircle,
      status: currentStep === 0 ? 'current' : currentStep > 0 ? 'complete' : 'pending'
    },
    {
      title: 'Add Websites',
      description: 'Add the websites you want to track',
      icon: Plus,
      status: currentStep === 1 ? 'current' : currentStep > 1 ? 'complete' : 'pending'
    },
    {
      title: 'Implementation',
      description: 'Get tracking code and implementation instructions',
      icon: Code,
      status: currentStep === 2 ? 'current' : currentStep > 2 ? 'complete' : 'pending'
    },
    {
      title: 'Verification',
      description: 'Verify tracking is working correctly',
      icon: Zap,
      status: currentStep === 3 ? 'current' : currentStep > 3 ? 'complete' : 'pending'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      const status = validateTrackingSetup();
      setValidationStatus(status);
      setTrackingEnabled(status.valid);
    }
  }, [isOpen]);

  const getTrackingScript = (websiteId) => {
    return `<!-- Start Analytics Tracking Code -->
<script>
  (function(w,d,s,l,i){
    w[l]=w[l]||[];
    const script = d.createElement(s);
    script.async = true;
    script.src = 'https://your-tracking-domain.com/tracker.js';
    script.setAttribute('data-website-id', '${websiteId}');
    d.head.appendChild(script);
  })(window,document,'script','analytics','${websiteId}');
</script>
<!-- End Analytics Tracking Code -->`;
  };

  const addWebsite = () => {
    setWebsites([...websites, { url: '', status: 'pending' }]);
  };

  const updateWebsiteUrl = (index, url) => {
    const newWebsites = [...websites];
    newWebsites[index].url = url;
    setWebsites(newWebsites);
  };

  const removeWebsite = (index) => {
    const newWebsites = [...websites];
    newWebsites.splice(index, 1);
    setWebsites(newWebsites);
  };

  const testWebsiteTracking = async (index) => {
    const website = websites[index];
    try {
      const result = await initializeTracking(website.url);
      const newWebsites = [...websites];
      newWebsites[index].status = result.success ? 'success' : 'error';
      setWebsites(newWebsites);
    } catch (error) {
      const newWebsites = [...websites];
      newWebsites[index].status = 'error';
      setWebsites(newWebsites);
    }
  };

  const copyTrackingScript = async (index) => {
    const script = getTrackingScript(websites[index].url);
    try {
      await navigator.clipboard.writeText(script);
      setCopiedScriptIndex(index);
      setTimeout(() => setCopiedScriptIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy script:', err);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <StatusCard 
              status={validationStatus.valid}
              issues={validationStatus.issues}
              isDarkMode={isDarkMode}
            />
          </motion.div>
        );

      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <AnimatePresence>
              {websites.map((website, index) => (
                <WebsiteInput
                  key={index}
                  website={website}
                  index={index}
                  onUpdate={updateWebsiteUrl}
                  onRemove={removeWebsite}
                  isDarkMode={isDarkMode}
                />
              ))}
            </AnimatePresence>
            <AddWebsiteButton onClick={addWebsite} isDarkMode={isDarkMode} />
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {websites.map((website, index) => (
              <ImplementationCard
                key={index}
                website={website}
                index={index}
                script={getTrackingScript(website.url)}
                onCopyScript={copyTrackingScript}
                copiedIndex={copiedScriptIndex}
                isDarkMode={isDarkMode}
              />
            ))}
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {websites.map((website, index) => (
              <VerificationCard
                key={index}
                website={website}
                index={index}
                onTest={testWebsiteTracking}
                isDarkMode={isDarkMode}
              />
            ))}
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm"
      >
        <div className="flex items-center justify-center min-h-screen px-4 py-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-900/95 border border-gray-700/50' 
                : 'bg-white/95 border border-gray-200/50'
            } backdrop-blur-xl`}
          >
            {/* Header */}
            <div className={`${
              isDarkMode 
                ? 'bg-gradient-to-r from-gray-800/90 to-gray-900/90' 
                : 'bg-gradient-to-r from-blue-50/90 to-indigo-100/90'
            } px-8 py-6 backdrop-blur-sm`}>
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-2xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                    : 'bg-gradient-to-br from-blue-600 to-indigo-700'
                } shadow-lg`}>
                  <Globe size={24} className="text-white" />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Website Tracking Setup
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Configure analytics tracking for your websites
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="px-8 py-6">
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                  <StepIndicator
                    key={index}
                    step={step}
                    index={index}
                    isLast={index === steps.length - 1}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>

              {/* Step Content */}
              <div className="min-h-[400px]">
                {renderStepContent()}
              </div>
            </div>

            {/* Footer */}
            <div className={`px-8 py-6 ${
              isDarkMode ? 'bg-gray-800/50 border-t border-gray-700/50' : 'bg-gray-50/50 border-t border-gray-200/50'
            } backdrop-blur-sm`}>
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  {currentStep > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                        isDarkMode 
                          ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/50' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                      }`}
                    >
                      Previous
                    </motion.button>
                  )}
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
                </div>
                
                <div>
                  {currentStep < steps.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={currentStep === 0 && !validationStatus.valid}
                      className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                        currentStep === 0 && !validationStatus.valid
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg'
                      }`}
                    >
                      <span>Next Step</span>
                      <ChevronRight size={18} />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onWebsitesAdded(websites);
                        onClose();
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg"
                    >
                      Complete Setup
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Component sub-components for better organization
const StepIndicator = ({ step, index, isLast, isDarkMode }) => {
  const Icon = step.icon;
  
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            step.status === 'complete' 
              ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg' 
              : step.status === 'current'
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-110'
              : isDarkMode 
              ? 'bg-gray-700/50 text-gray-400' 
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          <Icon size={20} />
        </motion.div>
        <div className="mt-3 text-center">
          <p className={`text-sm font-medium ${
            step.status === 'current' 
              ? isDarkMode ? 'text-white' : 'text-gray-900'
              : isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {step.title}
          </p>
          <p className={`text-xs mt-1 max-w-[120px] ${
            isDarkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            {step.description}
          </p>
        </div>
      </div>
      {!isLast && (
        <div className={`w-24 h-0.5 mx-4 mt-[-40px] ${
          index < currentStep 
            ? 'bg-gradient-to-r from-green-400 to-green-500' 
            : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
        }`} />
      )}
    </div>
  );
};

const StatusCard = ({ status, issues, isDarkMode }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`p-6 rounded-2xl ${
      isDarkMode ? 'bg-gray-800/30 border border-gray-600/30' : 'bg-gray-50/50 border border-gray-200/30'
    } backdrop-blur-sm`}
  >
    <div className="flex items-center space-x-4 mb-4">
      {status ? (
        <CheckCircle className="text-green-500 w-8 h-8" />
      ) : (
        <AlertCircle className="text-red-500 w-8 h-8" />
      )}
      <div>
        <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Tracking Status: {status ? 'Enabled' : 'Disabled'}
        </h4>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {status ? 'Your account is ready for website tracking' : 'Tracking needs to be enabled'}
        </p>
      </div>
    </div>
    {!status && issues.length > 0 && (
      <div className="space-y-2">
        {issues.map((issue, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm text-red-400">
            <XCircle className="w-4 h-4 flex-shrink-0" />
            <span>{issue}</span>
          </div>
        ))}
      </div>
    )}
  </motion.div>
);

const WebsiteInput = ({ website, index, onUpdate, onRemove, isDarkMode }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className="flex items-center space-x-3"
  >
    <div className="flex-1">
      <input
        type="url"
        placeholder="Enter website URL (e.g., https://example.com)"
        value={website.url}
        onChange={(e) => onUpdate(index, e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
          isDarkMode 
            ? 'bg-gray-800/50 text-white border-gray-600/50 focus:border-blue-500 focus:bg-gray-800' 
            : 'bg-gray-50/50 text-gray-900 border-gray-200/50 focus:border-blue-500 focus:bg-white'
        } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
      />
    </div>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onRemove(index)}
      className="p-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
    >
      <XCircle size={20} />
    </motion.button>
  </motion.div>
);

const AddWebsiteButton = ({ onClick, isDarkMode }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-200 ${
      isDarkMode 
        ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30' 
        : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200'
    } backdrop-blur-sm w-full justify-center`}
  >
    <Plus size={20} />
    <span className="font-medium">Add Website</span>
  </motion.button>
);

const ImplementationCard = ({ website, index, script, onCopyScript, copiedIndex, isDarkMode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`p-6 rounded-2xl ${
      isDarkMode ? 'bg-gray-800/30 border border-gray-600/30' : 'bg-gray-50/50 border border-gray-200/30'
    } backdrop-blur-sm space-y-4`}
  >
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Globe size={20} className="text-blue-500" />
        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {website.url}
        </h4>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCopyScript(index)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          copiedIndex === index
            ? 'bg-green-500 text-white'
            : isDarkMode 
            ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
      >
        <Copy size={16} />
        <span>{copiedIndex === index ? 'Copied!' : 'Copy Code'}</span>
      </motion.button>
    </div>
    
    <div className={`p-4 rounded-xl ${
      isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'
    } font-mono text-sm overflow-x-auto`}>
      <pre className="whitespace-pre-wrap break-all text-xs">
        {script}
      </pre>
    </div>
    
    <div className={`p-4 rounded-xl ${
      isDarkMode ? 'bg-blue-900/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
    }`}>
      <h5 className={`font-medium mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>
        Implementation Instructions:
      </h5>
      <ol className={`list-decimal list-inside space-y-1 text-sm ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <li>Copy the tracking code above</li>
        <li>Paste it in your website's <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">&lt;head&gt;</code> section</li>
        <li>The script should be added before the closing <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">&lt;/head&gt;</code> tag</li>
        <li>Save your changes and deploy your website</li>
      </ol>
    </div>
  </motion.div>
);

const VerificationCard = ({ website, index, onTest, isDarkMode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`p-6 rounded-2xl ${
      isDarkMode ? 'bg-gray-800/30 border border-gray-600/30' : 'bg-gray-50/50 border border-gray-200/30'
    } backdrop-blur-sm`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <Globe size={20} className="text-blue-500" />
        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {website.url}
        </span>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onTest(index)}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 shadow-lg"
      >
        <RefreshCw size={16} />
        <span>Test Tracking</span>
      </motion.button>
    </div>
    
    {website.status === 'success' && (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center space-x-2 text-green-500 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
      >
        <CheckCircle size={20} />
        <span className="font-medium">Tracking verified successfully</span>
      </motion.div>
    )}
    
    {website.status === 'error' && (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center space-x-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
      >
        <AlertCircle size={20} />
        <span className="font-medium">Tracking verification failed</span>
      </motion.div>
    )}
  </motion.div>
);

export default WebsiteTrackingModal;