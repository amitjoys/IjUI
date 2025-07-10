import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab, isDarkMode }) => (
  <div className="flex space-x-8">
    <button
      className={`text-sm font-medium pb-2 transition-colors relative ${
        activeTab === 'people' 
          ? 'text-blue-500' 
          : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={() => setActiveTab('people')}
    >
      People
      {activeTab === 'people' && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></div>
      )}
    </button>
    <button
      className={`text-sm font-medium pb-2 transition-colors relative ${
        activeTab === 'companies' 
          ? 'text-blue-500' 
          : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={() => setActiveTab('companies')}
    >
      Companies
      {activeTab === 'companies' && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></div>
      )}
    </button>
    <button className={`text-sm font-medium pb-2 transition-colors ${
      isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
    }`}>
      Saved lists
    </button>
  </div>
);

export default TabNavigation;