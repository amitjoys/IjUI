import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab, isDarkMode }) => (
  <div className="flex space-x-6">
    <button
      className={`text-sm font-medium pb-2 transition-colors ${
        activeTab === 'people' 
          ? 'text-blue-500 border-b-2 border-blue-500' 
          : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={() => setActiveTab('people')}
    >
      People
    </button>
    <button
      className={`text-sm font-medium pb-2 transition-colors ${
        activeTab === 'companies' 
          ? 'text-blue-500 border-b-2 border-blue-500' 
          : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={() => setActiveTab('companies')}
    >
      Companies
    </button>
    <button className={`text-sm font-medium pb-2 transition-colors ${
      isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
    }`}>
      Saved lists
    </button>
  </div>
);

export default TabNavigation;
