import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab, isDarkMode }) => (
  <div className="flex space-x-4 mb-4">
    <button
      className={`font-semibold pb-2 ${activeTab === 'people' ? 'text-blue-500 border-b-2 border-blue-500' : isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
      onClick={() => setActiveTab('people')}
    >
      People
    </button>
    <button
      className={`font-semibold pb-2 ${activeTab === 'companies' ? 'text-blue-500 border-b-2 border-blue-500' : isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
      onClick={() => setActiveTab('companies')}
    >
      Companies
    </button>
    <button className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Saved lists</button>
  </div>
);

export default TabNavigation;
