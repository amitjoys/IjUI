import React, { useState } from 'react';
import { Linkedin, Check, Mail, Phone } from 'lucide-react';

const ResultsTable = ({ results, openProfileModal, openCompanyModal, handleSave, isDarkMode, activeTab }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [customSelectCount, setCustomSelectCount] = useState('');

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(results.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCustomSelect = () => {
    const count = parseInt(customSelectCount);
    if (!isNaN(count) && count > 0 && count <= results.length) {
      setSelectedItems(results.slice(0, count).map(item => item.id));
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Selection controls - fixed at top */}
      <div className={`flex-shrink-0 p-4 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="mr-2"
            />
            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>Select All</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={customSelectCount}
              onChange={(e) => setCustomSelectCount(e.target.value)}
              placeholder="Custom select count"
              className={`px-3 py-1 border rounded text-sm min-w-0 w-32 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button 
              onClick={handleCustomSelect}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
            >
              Select
            </button>
          </div>
        </div>
      </div>

      {/* Table container with fixed headers */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto">
          <table className="w-full">
            {/* Fixed header */}
            <thead className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-600 min-w-[60px]">
                  Select
                </th>
                <th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-600 min-w-[150px]">
                  {activeTab === 'people' ? 'Name' : 'Company'}
                </th>
                <th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-600 min-w-[120px]">
                  {activeTab === 'people' ? 'Title' : 'Industry'}
                </th>
                <th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-600 min-w-[150px]">
                  {activeTab === 'people' ? 'Company' : 'Size'}
                </th>
                <th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-600 min-w-[100px]">
                  Quick Actions
                </th>
                <th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-600 min-w-[180px]">
                  Email
                </th>
                <th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-600 min-w-[120px]">
                  Phone
                </th>
                <th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-600 min-w-[120px]">
                  Location
                </th>
                <th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-600 min-w-[80px]">
                  Save
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <ResultRow
                  key={result.id}
                  result={result}
                  openProfileModal={openProfileModal}
                  openCompanyModal={openCompanyModal}
                  handleSave={handleSave}
                  isDarkMode={isDarkMode}
                  activeTab={activeTab}
                  isSelected={selectedItems.includes(result.id)}
                  onSelect={() => handleSelectItem(result.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ResultRow = ({ result, openProfileModal, openCompanyModal, handleSave, isDarkMode, activeTab, isSelected, onSelect }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const maskEmail = (email) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    return `${localPart.slice(0, 2)}xxxx@${domain.slice(0, 2)}xxxx.com`;
  };

  const maskPhone = (phone) => {
    if (!phone) return '';
    return `${phone.slice(0, 4)}xxxxx`;
  };

  const getIconColor = (isShowing) => {
    if (isDarkMode) {
      return isShowing ? 'text-blue-400' : 'text-gray-300 hover:text-gray-100';
    } else {
      return isShowing ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700';
    }
  };

  return (
    <tr className={`border-t hover:bg-opacity-50 ${
      isDarkMode 
        ? 'border-gray-700 hover:bg-gray-700' 
        : 'border-gray-200 hover:bg-gray-50'
    }`}>
      <td className="p-3">
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={onSelect}
          className="rounded"
        />
      </td>
      <td className="p-3">
        <div className="flex items-center">
          <button 
            onClick={() => activeTab === 'people' ? openProfileModal(result) : openCompanyModal(result)} 
            className="text-blue-500 hover:underline font-medium truncate max-w-[140px]"
            title={activeTab === 'people' ? result.name : result.name}
          >
            {activeTab === 'people' ? result.name : result.name}
          </button>
        </div>
      </td>
      <td className="p-3">
        <span className="truncate max-w-[110px] block" title={activeTab === 'people' ? result.title : result.industry}>
          {activeTab === 'people' ? result.title : result.industry}
        </span>
      </td>
      <td className="p-3">
        <div className="flex items-center">
          <Linkedin className="text-blue-500 mr-2 flex-shrink-0" size={16} />
          <span className="mr-2 flex-shrink-0">{result.logo}</span>
          {activeTab === 'people' ? (
            <button 
              onClick={() => openCompanyModal({ 
                name: result.company, 
                industry: 'Unknown', 
                size: 'Unknown',     
              })} 
              className="text-blue-500 hover:underline truncate max-w-[100px]"
              title={result.company}
            >
              {result.company}
            </button>
          ) : (
            <span className="truncate" title={result.size}>{result.size}</span>
          )}
        </div>
      </td>
      <td className="p-3">
        <div className="flex items-center gap-2">
          {activeTab === 'people' && (
            <>
              {result.email && (
                <button 
                  className={`${getIconColor(showEmail)} transition-colors`}
                  onClick={() => setShowEmail(!showEmail)}
                  title={showEmail ? "Hide Email" : "Show Email"}
                >
                  <Mail size={16} />
                </button>
              )}
              {result.phone && (
                <button 
                  className={`${getIconColor(showPhone)} transition-colors`}
                  onClick={() => setShowPhone(!showPhone)}
                  title={showPhone ? "Hide Phone" : "Show Phone"}
                >
                  <Phone size={16} />
                </button>
              )}
            </>
          )}
        </div>
      </td>
      <td className="p-3">
        <span className="text-sm truncate max-w-[170px] block" title={result.email}>
          {activeTab === 'people' && result.email ? (showEmail ? result.email : maskEmail(result.email)) : ''}
        </span>
      </td>
      <td className="p-3">
        <span className="text-sm truncate max-w-[110px] block" title={result.phone}>
          {activeTab === 'people' && result.phone ? (showPhone ? result.phone : maskPhone(result.phone)) : ''}
        </span>
      </td>
      <td className="p-3">
        <span className="text-sm truncate max-w-[110px] block" title={result.location}>
          {result.location || '-'}
        </span>
      </td>
      <td className="p-3">
        <button 
          onClick={() => handleSave(result)}
          className="flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          {result.saved ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <span className="text-sm text-blue-500 hover:underline">Save</span>
          )}
        </button>
      </td>
    </tr>
  );
};

export default ResultsTable;