import React, { useState } from 'react';
import { Linkedin, Check, Mail, Phone, MapPin } from 'lucide-react';

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
    <div className="h-full flex flex-col">
      {/* Selection controls - compact header */}
      <div className={`flex-shrink-0 px-4 py-2 border-b ${isDarkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="mr-2 h-4 w-4 rounded border-gray-300"
              />
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Select All</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={customSelectCount}
                onChange={(e) => setCustomSelectCount(e.target.value)}
                placeholder="Count"
                className={`px-2 py-1 border rounded text-xs w-16 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button 
                onClick={handleCustomSelect}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
              >
                Select
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {selectedItems.length} of {results.length} selected
          </div>
        </div>
      </div>

      {/* Table container - full height */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          {/* Sticky header */}
          <thead className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 w-12">
                <span className="sr-only">Select</span>
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 min-w-[180px]">
                {activeTab === 'people' ? 'Name' : 'Company'}
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 min-w-[140px]">
                {activeTab === 'people' ? 'Title' : 'Industry'}
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 min-w-[160px]">
                {activeTab === 'people' ? 'Company' : 'Size'}
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 w-20">
                Actions
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 min-w-[200px]">
                Email
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 min-w-[130px]">
                Phone
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 min-w-[140px]">
                Location
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 w-16">
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
  );
};

const ResultRow = ({ result, openProfileModal, openCompanyModal, handleSave, isDarkMode, activeTab, isSelected, onSelect }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const maskEmail = (email) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    return `${localPart.slice(0, 2)}***@${domain.slice(0, 2)}***.com`;
  };

  const maskPhone = (phone) => {
    if (!phone) return '';
    return `${phone.slice(0, 3)}****${phone.slice(-3)}`;
  };

  const getIconColor = (isShowing) => {
    if (isDarkMode) {
      return isShowing ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200';
    } else {
      return isShowing ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700';
    }
  };

  return (
    <tr className={`border-t hover:bg-opacity-50 transition-colors ${
      isDarkMode 
        ? 'border-gray-700 hover:bg-gray-700' 
        : 'border-gray-100 hover:bg-gray-50'
    } ${isSelected ? isDarkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50' : ''}`}>
      <td className="px-3 py-2">
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={onSelect}
          className="h-4 w-4 rounded border-gray-300"
        />
      </td>
      <td className="px-3 py-2">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mr-3 ${
            isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-600'
          }`}>
            {(activeTab === 'people' ? result.name : result.name).charAt(0)}
          </div>
          <button 
            onClick={() => activeTab === 'people' ? openProfileModal(result) : openCompanyModal(result)} 
            className="text-blue-500 hover:text-blue-600 font-medium text-sm hover:underline"
            title={activeTab === 'people' ? result.name : result.name}
          >
            {activeTab === 'people' ? result.name : result.name}
          </button>
        </div>
      </td>
      <td className="px-3 py-2">
        <span className="text-sm text-gray-600 dark:text-gray-300" title={activeTab === 'people' ? result.title : result.industry}>
          {activeTab === 'people' ? result.title : result.industry}
        </span>
      </td>
      <td className="px-3 py-2">
        <div className="flex items-center">
          {activeTab === 'people' ? (
            <>
              <Linkedin className="text-blue-500 mr-2 flex-shrink-0" size={14} />
              <button 
                onClick={() => openCompanyModal({ 
                  name: result.company, 
                  industry: 'Unknown', 
                  size: 'Unknown',     
                })} 
                className="text-blue-500 hover:text-blue-600 text-sm hover:underline"
                title={result.company}
              >
                {result.company}
              </button>
            </>
          ) : (
            <span className="text-sm text-gray-600 dark:text-gray-300" title={result.size}>{result.size}</span>
          )}
        </div>
      </td>
      <td className="px-3 py-2">
        <div className="flex items-center gap-1">
          {activeTab === 'people' && (
            <>
              {result.email && (
                <button 
                  className={`p-1 rounded transition-colors ${getIconColor(showEmail)}`}
                  onClick={() => setShowEmail(!showEmail)}
                  title={showEmail ? "Hide Email" : "Show Email"}
                >
                  <Mail size={14} />
                </button>
              )}
              {result.phone && (
                <button 
                  className={`p-1 rounded transition-colors ${getIconColor(showPhone)}`}
                  onClick={() => setShowPhone(!showPhone)}
                  title={showPhone ? "Hide Phone" : "Show Phone"}
                >
                  <Phone size={14} />
                </button>
              )}
            </>
          )}
        </div>
      </td>
      <td className="px-3 py-2">
        <span className="text-xs text-gray-600 dark:text-gray-300" title={result.email}>
          {activeTab === 'people' && result.email ? (showEmail ? result.email : maskEmail(result.email)) : ''}
        </span>
      </td>
      <td className="px-3 py-2">
        <span className="text-xs text-gray-600 dark:text-gray-300" title={result.phone}>
          {activeTab === 'people' && result.phone ? (showPhone ? result.phone : maskPhone(result.phone)) : ''}
        </span>
      </td>
      <td className="px-3 py-2">
        <div className="flex items-center">
          <MapPin size={12} className="text-gray-400 mr-1" />
          <span className="text-xs text-gray-600 dark:text-gray-300" title={result.location}>
            {result.location || '-'}
          </span>
        </div>
      </td>
      <td className="px-3 py-2">
        <button 
          onClick={() => handleSave(result)}
          className="flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          {result.saved ? (
            <Check size={14} className="text-green-500" />
          ) : (
            <span className="text-xs text-blue-500 hover:underline">Save</span>
          )}
        </button>
      </td>
    </tr>
  );
};

export default ResultsTable;