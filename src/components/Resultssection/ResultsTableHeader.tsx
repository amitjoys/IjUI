import React from 'react';
import { RefreshCw, Download, Upload, MoreHorizontal } from 'lucide-react';

const ResultsTableHeader = ({ activeResultsTab, setActiveResultsTab, isDarkMode, totalCount, netNewCount, savedCount }) => (
  <div className="flex justify-between items-center p-3 border-b border-gray-200">
    <TabButtons 
      activeResultsTab={activeResultsTab} 
      setActiveResultsTab={setActiveResultsTab} 
      isDarkMode={isDarkMode}
      totalCount={totalCount}
      netNewCount={netNewCount}
      savedCount={savedCount}
    />
    <div className="flex space-x-3">
      <ExportButton isDarkMode={isDarkMode} />
      <ActionButtons isDarkMode={isDarkMode} />
    </div>
  </div>
);

const TabButtons = ({ activeResultsTab, setActiveResultsTab, isDarkMode, totalCount, netNewCount, savedCount }) => (
  <div className="flex space-x-6">
    {[
      { key: 'total', label: 'Total', count: totalCount },
      { key: 'netNew', label: 'Net New', count: netNewCount },
      { key: 'saved', label: 'Saved', count: savedCount }
    ].map(({ key, label, count }) => (
      <button
        key={key}
        className={`text-sm font-medium transition-colors ${
          activeResultsTab === key 
            ? 'text-blue-500' 
            : isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => setActiveResultsTab(key)}
      >
        {label} ({count})
      </button>
    ))}
  </div>
);

const ExportButton = ({ isDarkMode }) => (
  <button className={`border rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
    isDarkMode 
      ? 'text-pink-400 border-pink-400 hover:bg-pink-400 hover:text-gray-900' 
      : 'text-pink-500 border-pink-500 hover:bg-pink-50'
  }`}>
    Export to CSV
  </button>
);

const ActionButtons = ({ isDarkMode }) => (
  <div className="flex space-x-1">
    {[RefreshCw, Download, Upload, MoreHorizontal].map((Icon, index) => (
      <button 
        key={index} 
        className={`p-1.5 rounded-md transition-colors ${
          isDarkMode 
            ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
        }`}
      >
        <Icon size={14} />
      </button>
    ))}
  </div>
);

export default ResultsTableHeader;