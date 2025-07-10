import React from 'react';
import { RefreshCw, Download, Upload, MoreHorizontal } from 'lucide-react';

const ResultsTableHeader = ({ activeResultsTab, setActiveResultsTab, isDarkMode, totalCount, netNewCount, savedCount }) => (
  <div className="flex justify-between items-center p-4 border-b border-gray-200">
    <TabButtons 
      activeResultsTab={activeResultsTab} 
      setActiveResultsTab={setActiveResultsTab} 
      isDarkMode={isDarkMode}
      totalCount={totalCount}
      netNewCount={netNewCount}
      savedCount={savedCount}
    />
    <div className="flex space-x-4">
      <ExportButton isDarkMode={isDarkMode} />
      <ActionButtons isDarkMode={isDarkMode} />
    </div>
  </div>
);

const TabButtons = ({ activeResultsTab, setActiveResultsTab, isDarkMode, totalCount, netNewCount, savedCount }) => (
  <div className="flex space-x-4">
    {[
      { key: 'total', label: 'Total', count: totalCount },
      { key: 'netNew', label: 'Net New', count: netNewCount },
      { key: 'saved', label: 'Saved', count: savedCount }
    ].map(({ key, label, count }) => (
      <button
        key={key}
        className={`font-semibold ${activeResultsTab === key ? 'text-blue-500' : isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}
        onClick={() => setActiveResultsTab(key)}
      >
        {label} ({count})
      </button>
    ))}
  </div>
);

const ExportButton = ({ isDarkMode }) => (
  <button className={`border rounded px-2 py-1 ${isDarkMode ? 'text-pink-400 border-pink-400' : 'text-pink-500 border-pink-500'}`}>
    Export to CSV
  </button>
);

const ActionButtons = ({ isDarkMode }) => (
  <div className="flex space-x-2">
    {[RefreshCw, Download, Upload, MoreHorizontal].map((Icon, index) => (
      <button key={index} className={`p-1 hover:bg-gray-100 rounded ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
        <Icon size={16} />
      </button>
    ))}
  </div>
);

export default ResultsTableHeader;