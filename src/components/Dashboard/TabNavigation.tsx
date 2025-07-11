import React, { memo } from 'react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
}

const TabNavigation = memo<TabNavigationProps>(({ activeTab, setActiveTab, isDarkMode }) => {
  const tabs = [
    { id: 'people', label: 'People' },
    { id: 'companies', label: 'Companies' },
    { id: 'saved', label: 'Saved lists', disabled: true }
  ];

  return (
    <div className="flex space-x-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`text-sm font-medium pb-2 transition-fast relative ${
            activeTab === tab.id 
              ? 'text-blue-500' 
              : isDarkMode 
                ? 'text-gray-400 hover:text-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
          } ${tab.disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={() => !tab.disabled && setActiveTab(tab.id)}
          disabled={tab.disabled}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></div>
          )}
        </button>
      ))}
    </div>
  );
});

TabNavigation.displayName = 'TabNavigation';

export default TabNavigation;