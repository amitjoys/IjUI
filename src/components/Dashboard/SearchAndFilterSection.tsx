import React, { useState } from 'react';
import { ChevronUp, ChevronDown, X, ToggleLeft, ToggleRight, Info, Globe, BarChart,ChevronRight } from 'lucide-react';
import BuyerIntentModal from './BuyerIntentModal';
import WebsiteTrackingModal from './WebsiteTrackingModal';
import { useNavigate } from 'react-router-dom';

const SearchAndFilterSection = ({ activeTab, isDarkMode, isVisible, toggleVisibility }) => {
  const [isBuyerIntentModalOpen, setIsBuyerIntentModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [showTrafficFilters, setShowTrafficFilters] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [trackedWebsites, setTrackedWebsites] = useState([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const navigate = useNavigate();
  const handleAnalyticsClick = () => {
    navigate('/analytics');
  };


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

  const handleWebsitesAdded = (websites) => {
    setTrackedWebsites(websites);
    setShowTrafficFilters(true);
  };

  

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-4 rounded-md shadow mb-4 transition-all duration-300 ${isVisible ? '' : 'h-16 overflow-hidden'}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="font-bold">Search and Filters</span>
          <span className={`ml-2 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'} px-2 py-1 rounded-full text-sm`}>2</span>
        </div>
        <button 
          className={`text-blue-500 flex items-center ${isDarkMode ? 'text-blue-400' : ''}`} 
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <>Hide <ChevronUp size={16} className="ml-1" /></>
          ) : (
            <>Show Filters <ChevronDown size={16} className="ml-1" /></>
          )}
        </button>
      </div>

      {/* Traffic Filter Toggle Section with Website Tracking */}
      <div className="relative mb-4 mt-2">
        <div className={`p-3 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex flex-col space-y-3">
            {/* Website Tracking Setup Button */}
            <button
              onClick={() => setIsTrackingModalOpen(true)}
              className={`flex items-center justify-between p-2 rounded-md transition-colors duration-200 ${
                isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-blue-500" />
                <span className={`text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {trackedWebsites.length > 0 
                    ? `${trackedWebsites.length} Website${trackedWebsites.length > 1 ? 's' : ''} Tracked` 
                    : 'Setup Website Tracking'}
                </span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Traffic Filters Toggle */}
            {trackedWebsites.length > 0 && (
              <>
                <button
                  onClick={() => setShowTrafficFilters(!showTrafficFilters)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors duration-200 ${
                    showTrafficFilters 
                      ? `${isDarkMode ? 'bg-blue-900' : 'bg-blue-50'}`
                      : `${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {showTrafficFilters ? (
                      <ToggleRight className="w-8 h-8 text-blue-500" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-gray-400" />
                    )}
                    <span className={`text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Filter Website Traffic
                    </span>
                  </div>
                  <Info className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>

                {/* Analytics Button */}
                <button
                  onClick={handleAnalyticsClick}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors duration-200 ${
                    isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <BarChart className="w-5 h-5 text-blue-500" />
                    <span className={`text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      View Detailed Analytics
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Tooltip */}
          {showTooltip && (
            <div 
              className={`absolute right-0 mt-2 p-3 rounded-md shadow-lg z-10 w-64 text-sm ${
                isDarkMode 
                  ? 'bg-gray-900 text-gray-300 border border-gray-700' 
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              Filter results based on user website activity including visit frequency, 
              pages viewed, time spent on site, and last visit date.
            </div>
          )}
        </div>
      </div>

      {/* Rest of the component remains the same... */}
      {isVisible && (
        <>
          <div className="mb-4">
            <input type="text" placeholder={`Search ${activeTab}...`} className={`w-full border rounded-md px-3 py-2 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`} />
          </div>
          <div className="mb-4 flex items-center">
            <span className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} px-2 py-1 rounded-full text-sm mr-2`}>Likely to engage</span>
            <X size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} cursor-pointer`} />
          </div>
          {currentFilters.map((filter) => (
            <div key={filter.label} className="mb-4">
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {filter.label}
                {filter.label === 'Buying Intent' && (
                  <button
                    onClick={() => setIsBuyerIntentModalOpen(true)}
                    className="ml-2 text-blue-500"
                  >
                    Edit
                  </button>
                )}
              </label>
              <select className={`mt-1 block w-full pl-3 pr-10 py-2 text-base ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300 text-gray-900'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md`}>
                <option>Select {filter.label}</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
          <button className={`w-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded-md mt-4 transition-colors duration-300`}>Save Search</button>
        </>
      )}
      
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
};

export default SearchAndFilterSection;