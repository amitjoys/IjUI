import React, { useState } from 'react';
import { ChevronUp, ChevronDown, X, ToggleLeft, ToggleRight, Info, Globe, BarChart, ChevronRight } from 'lucide-react';
import BuyerIntentModal from './BuyerIntentModal';
import WebsiteTrackingModal from './WebsiteTrackingModal';
import { useNavigate } from 'react-router-dom';

import React, { useState, useCallback, memo } from 'react';
import { ChevronUp, ChevronDown, X, ToggleLeft, ToggleRight, Info, Globe, BarChart, ChevronRight } from 'lucide-react';
import BuyerIntentModal from './BuyerIntentModal';
import WebsiteTrackingModal from './WebsiteTrackingModal';
import { useNavigate } from 'react-router-dom';

const SearchAndFilterSection = memo(({ activeTab, isDarkMode, isVisible, toggleVisibility }) => {
  const [isBuyerIntentModalOpen, setIsBuyerIntentModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [showTrafficFilters, setShowTrafficFilters] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [trackedWebsites, setTrackedWebsites] = useState([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const navigate = useNavigate();
  
  const handleAnalyticsClick = useCallback(() => {
    navigate('/analytics');
  }, [navigate]);

  const handleWebsitesAdded = useCallback((websites) => {
    setTrackedWebsites(websites);
    setShowTrafficFilters(true);
  }, []);

  // Original filters array...
  const filters = [
    { label: 'Job Titles', count: 1, options: ['CEO', 'CTO', 'Manager', 'Developer'] },
    { label: 'Company', count: 0, options: ['Startup', 'Enterprise', 'SMB'] },
    { label: 'Location', count: 0, options: ['USA', 'Europe', 'Asia'] },
    { label: '# Employees', count: 0, options: ['1-10', '11-50', '51-200', '201-500', '500+'] },
    { label: 'Industry & Keywords', count: 0, options: ['Technology', 'Finance', 'Healthcare', 'Education'] },
    { label: 'Buying Intent', count: 0, options: ['High', 'Medium', 'Low'] },
  ];

  // Traffic filters...
  const trafficFilters = [
    { label: 'Visit Frequency', count: 0, options: ['Daily', 'Weekly', 'Monthly'] },
    { label: 'Pages Visited', count: 0, options: ['1-5', '6-10', '10+'] },
    { label: 'Time on Site', count: 0, options: ['< 1 min', '1-5 mins', '5+ mins'] },
    { label: 'Last Visit', count: 0, options: ['Today', 'This Week', 'This Month'] },
  ];

  // Other filter arrays remain the same...
  const peopleFilters = [
    { label: 'Job Level', count: 0, options: ['C-Level', 'VP', 'Director', 'Manager'] },
    { label: 'Department', count: 0, options: ['Sales', 'Marketing', 'Engineering', 'HR'] },
  ];

  const companyFilters = [
    { label: 'Company Type', count: 0, options: ['Public', 'Private', 'Non-Profit'] },
    { label: 'Revenue', count: 0, options: ['$0-1M', '$1-10M', '$10-100M', '$100M+'] },
  ];

  const baseFilters = activeTab === 'people' ? [...filters, ...peopleFilters] : [...filters, ...companyFilters];
  const currentFilters = showTrafficFilters ? [...baseFilters, ...trafficFilters] : baseFilters;

  return (
    <div className={`h-full flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-r border-gray-200 dark:border-gray-700`}>
      {/* Compact Header */}
      <div className="flex-shrink-0 p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Filters</span>
            <span className={`ml-1.5 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} px-1.5 py-0.5 rounded-full text-xs font-medium`}>
              2
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Compact Search Input */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <input 
            type="text" 
            placeholder={`Search ${activeTab}...`} 
            className={`w-full px-2.5 py-1.5 border rounded text-xs ${
              isDarkMode 
                ? 'bg-gray-800 text-white border-gray-600 placeholder-gray-400' 
                : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500'
            } focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors`} 
          />
        </div>

        {/* Compact Active Filters */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-50 text-blue-700'}`}>
              Likely to engage
            </span>
            <X size={12} className={`ml-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} cursor-pointer hover:text-gray-300`} />
          </div>
        </div>

        {/* Compact Website Tracking Section */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className={`p-2.5 rounded border ${isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
            <div className="space-y-2">
              {/* Website Tracking Setup Button */}
              <button
                onClick={() => setIsTrackingModalOpen(true)}
                className={`flex items-center justify-between w-full p-2 rounded transition-colors ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Globe className="w-3.5 h-3.5 text-blue-500" />
                  <span className={`text-xs ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {trackedWebsites.length > 0 
                      ? `${trackedWebsites.length} Website${trackedWebsites.length > 1 ? 's' : ''} Tracked` 
                      : 'Setup Website Tracking'}
                  </span>
                </div>
                <ChevronRight className="w-3 h-3 text-gray-400" />
              </button>

              {/* Analytics Button */}
              {trackedWebsites.length > 0 && (
                <button
                  onClick={handleAnalyticsClick}
                  className={`flex items-center justify-between w-full p-2 rounded transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <BarChart className="w-3.5 h-3.5 text-blue-500" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      View Analytics
                    </span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Compact Filter Options */}
        <div className="p-3 space-y-3">
          {currentFilters.map((filter) => (
            <div key={filter.label}>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {filter.label}
                {filter.label === 'Buying Intent' && (
                  <button
                    onClick={() => setIsBuyerIntentModalOpen(true)}
                    className="ml-1.5 text-blue-500 hover:text-blue-600 text-xs"
                  >
                    Edit
                  </button>
                )}
              </label>
              <select className={`w-full px-2.5 py-1.5 text-xs rounded border ${
                isDarkMode 
                  ? 'bg-gray-800 text-white border-gray-600 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors`}>
                <option>Select {filter.label}</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Compact Save Search Button */}
        <div className="p-3">
          <button className={`w-full py-2 px-3 text-xs font-semibold rounded transition-colors ${
            isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}>
            Save Search
          </button>
        </div>
      </div>
      
      {/* Modals */}
      <BuyerIntentModal
        isOpen={isBuyerIntentModalOpen}
        onClose={() => setIsBuyerIntentModalOpen(false)}
        isDarkMode={isDarkMode}
      />
      <WebsiteTrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        isDarkMode={isDarkMode}
        onWebsitesAdded={handleWebsitesAdded}
      />
    </div>
  );
});

SearchAndFilterSection.displayName = 'SearchAndFilterSection';

export default SearchAndFilterSection;

export default SearchAndFilterSection;