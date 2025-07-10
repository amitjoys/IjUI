import React, { useState } from 'react';
import { Linkedin, Check, Mail, Phone, MapPin, Eye, EyeOff } from 'lucide-react';

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
      <div className={`flex-shrink-0 px-3 py-2 border-b ${isDarkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="mr-2 h-3.5 w-3.5 rounded border-gray-300"
              />
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Select All</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={customSelectCount}
                onChange={(e) => setCustomSelectCount(e.target.value)}
                placeholder="Count"
                className={`px-2 py-1 border rounded text-xs w-14 ${
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
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full table-fixed">
          {/* Sticky header */}
          <thead className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 w-10">
                <span className="sr-only">Select</span>
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 w-44">
                {activeTab === 'people' ? 'Name' : 'Company'}
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 w-36">
                {activeTab === 'people' ? 'Title' : 'Industry'}
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 w-40">
                {activeTab === 'people' ? 'Company' : 'Size'}
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 w-20">
                Actions
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 w-48">
                Email
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 w-32">
                Phone
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 w-36">
                Location
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium border-b border-gray-200 dark:border-gray-600 w-16">
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

  const getActionButtonClass = (isShowing) => {
    if (isDarkMode) {
      return isShowing 
        ? 'bg-blue-600 text-white border-blue-600' 
        : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 hover:text-white';
    } else {
      return isShowing 
        ? 'bg-blue-500 text-white border-blue-500' 
        : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300';
    }
  };

  return (
    <tr className={`border-t hover:bg-opacity-50 transition-colors ${
      isDarkMode 
        ? 'border-gray-700 hover:bg-gray-700' 
        : 'border-gray-100 hover:bg-gray-50'
    } ${isSelected ? isDarkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50' : ''}`}>
      <td className="px-2 py-2">
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={onSelect}
          className="h-3.5 w-3.5 rounded border-gray-300"
        />
      </td>
      <td className="px-2 py-2 table-cell-base">
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-2 flex-shrink-0 ${
            isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-600'
          }`}>
            {(activeTab === 'people' ? result.name : result.name).charAt(0)}
          </div>
          <button 
            onClick={() => activeTab === 'people' ? openProfileModal(result) : openCompanyModal(result)} 
            className="text-blue-500 hover:text-blue-600 font-medium text-xs hover:underline text-truncate-1 flex-1"
            title={activeTab === 'people' ? result.name : result.name}
          >
            {activeTab === 'people' ? result.name : result.name}
          </button>
        </div>
      </td>
      <td className="px-2 py-2 table-cell-base">
        <span className="text-xs text-gray-600 dark:text-gray-300 text-truncate-2" title={activeTab === 'people' ? result.title : result.industry}>
          {activeTab === 'people' ? result.title : result.industry}
        </span>
      </td>
      <td className="px-2 py-2 table-cell-base">
        <div className="flex items-center">
          {activeTab === 'people' ? (
            <>
              <Linkedin className="text-blue-500 mr-1 flex-shrink-0" size={12} />
              <button 
                onClick={() => openCompanyModal({ 
                  name: result.company, 
                  industry: 'Unknown', 
                  size: 'Unknown',     
                })} 
                className="text-blue-500 hover:text-blue-600 text-xs hover:underline text-truncate-1 flex-1"
                title={result.company}
              >
                {result.company}
              </button>
            </>
          ) : (
            <span className="text-xs text-gray-600 dark:text-gray-300 text-truncate-1" title={result.size}>{result.size}</span>
          )}
        </div>
      </td>
      <td className="px-2 py-2">
        <div className="flex items-center gap-1">
          {activeTab === 'people' && (
            <>
              {result.email && (
                <button 
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs border transition-all duration-200 hover-lift ${getActionButtonClass(showEmail)}`}
                  onClick={() => setShowEmail(!showEmail)}
                  title={showEmail ? "Hide Email" : "Show Email"}
                >
                  {showEmail ? <EyeOff size={12} /> : <Eye size={12} />}
                  <span className="hidden sm:inline">Email</span>
                </button>
              )}
              {result.phone && (
                <button 
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs border transition-all duration-200 hover-lift ${getActionButtonClass(showPhone)}`}
                  onClick={() => setShowPhone(!showPhone)}
                  title={showPhone ? "Hide Phone" : "Show Phone"}
                >
                  {showPhone ? <EyeOff size={12} /> : <Eye size={12} />}
                  <span className="hidden sm:inline">Phone</span>
                </button>
              )}
            </>
          )}
        </div>
      </td>
      <td className="px-2 py-2 table-cell-base">
        <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-truncate-1`} title={result.email}>
          {activeTab === 'people' && result.email ? (showEmail ? result.email : maskEmail(result.email)) : ''}
        </div>
      </td>
      <td className="px-2 py-2 table-cell-base">
        <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-truncate-1`} title={result.phone}>
          {activeTab === 'people' && result.phone ? (showPhone ? result.phone : maskPhone(result.phone)) : ''}
        </div>
      </td>
      <td className="px-2 py-2 table-cell-base">
        <div className="flex items-center">
          <MapPin size={10} className="text-gray-400 mr-1 flex-shrink-0" />
          <span className="text-xs text-gray-600 dark:text-gray-300 text-truncate-1" title={result.location}>
            {result.location || '-'}
          </span>
        </div>
      </td>
      <td className="px-2 py-2">
        <button 
          onClick={() => handleSave(result)}
          className="flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          {result.saved ? (
            <Check size={12} className="text-green-500" />
          ) : (
            <span className="text-xs text-blue-500 hover:underline">Save</span>
          )}
        </button>
      </td>
    </tr>
  );
};

export default ResultsTable;