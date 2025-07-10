import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AlertCircle, ChevronRight, Globe, Plus, RefreshCw, CheckCircle, XCircle, Copy } from 'lucide-react';
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
      status: currentStep === 0 ? 'current' : currentStep > 0 ? 'complete' : 'pending'
    },
    {
      title: 'Add Websites',
      description: 'Add the websites you want to track',
      status: currentStep === 1 ? 'current' : currentStep > 1 ? 'complete' : 'pending'
    },
    {
      title: 'Implementation',
      description: 'Get tracking code and implementation instructions',
      status: currentStep === 2 ? 'current' : currentStep > 2 ? 'complete' : 'pending'
    },
    {
      title: 'Verification',
      description: 'Verify tracking is working correctly',
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
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex items-center space-x-3">
                {validationStatus.valid ? (
                  <CheckCircle className="text-green-500 w-6 h-6" />
                ) : (
                  <AlertCircle className="text-red-500 w-6 h-6" />
                )}
                <span className="font-medium">
                  Tracking Status: {validationStatus.valid ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              {!validationStatus.valid && (
                <div className="mt-3 text-sm text-red-400">
                  {validationStatus.issues.map((issue, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <XCircle className="w-4 h-4" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            {websites.map((website, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="url"
                  placeholder="Enter website URL (e.g., https://example.com)"
                  value={website.url}
                  onChange={(e) => updateWebsiteUrl(index, e.target.value)}
                  className={`flex-1 rounded-md px-3 py-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-white text-gray-900 border-gray-300'
                  } border`}
                />
                <button
                  onClick={() => removeWebsite(index)}
                  className="text-red-500 hover:text-red-600 p-2 rounded-md"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={addWebsite}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Website</span>
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {websites.map((website, index) => (
              <div key={index} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{website.url}</h3>
                  <button
                    onClick={() => copyTrackingScript(index)}
                    className={`flex items-center space-x-2 px-3 py-1 rounded ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copiedScriptIndex === index ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} font-mono text-sm`}>
                  <pre className="whitespace-pre-wrap break-all">
                    {getTrackingScript(website.url)}
                  </pre>
                </div>
                <div className="mt-4 text-sm">
                  <p className="font-medium mb-2">Implementation Instructions:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Copy the tracking code above</li>
                    <li>Paste it in your website's <code>&lt;head&gt;</code> section</li>
                    <li>The script should be added before the closing <code>&lt;/head&gt;</code> tag</li>
                    <li>Save your changes and deploy your website</li>
                  </ol>
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {websites.map((website, index) => (
              <div key={index} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <span>{website.url}</span>
                  <button
                    onClick={() => testWebsiteTracking(index)}
                    className={`flex items-center space-x-2 px-3 py-1 rounded ${
                      isDarkMode 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Test Tracking</span>
                  </button>
                </div>
                {website.status === 'success' && (
                  <div className="mt-2 text-green-500 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Tracking verified successfully</span>
                  </div>
                )}
                {website.status === 'error' && (
                  <div className="mt-2 text-red-500 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Tracking verification failed</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-500'} opacity-75`}></div>
        </div>

        <div className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}>
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium mb-4">
                  Website Tracking Setup
                </h3>

                <div className="mb-6">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center mb-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        step.status === 'complete' 
                          ? 'bg-green-500' 
                          : step.status === 'current'
                          ? 'bg-blue-500'
                          : isDarkMode 
                          ? 'bg-gray-700' 
                          : 'bg-gray-200'
                      }`}>
                        {step.status === 'complete' ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white">{index + 1}</span>
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{step.title}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {renderStepContent()}
              </div>
            </div>
          </div>

          <div className={`px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === 0 && !validationStatus.valid}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                  currentStep === 0 && !validationStatus.valid
                    ? 'bg-gray-400 cursor-not-allowed'
                    : isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                Next Step
                <ChevronRight className="ml-2 w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onWebsitesAdded(websites);
                  onClose();
                }}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm`}
              >
                Complete Setup
              </button>
            )}
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className={`mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
            )}
            <button
              onClick={onClose}
              className={`mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:w-auto sm:text-sm ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteTrackingModal;