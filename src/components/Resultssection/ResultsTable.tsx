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
      <div className={`flex-shrink-0 px-4 py-3 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select All</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={customSelectCount}
                onChange={(e) => setCustomSelectCount(e.target.value)}
                placeholder="Count"
                className={`px-3 py-1.5 border rounded-md text-sm w-20 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button 
                onClick={handleCustomSelect}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors font-medium"
              >
                Select
              </button>
            </div>
          </div>
          <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {selectedItems.length} of {results.length} selected
          </div>
        </div>
      </div>

      {/* Table container - full height */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full table-fixed">
          {/* Sticky header */}
          <thead className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 w-12">
                <span className="sr-only">Select</span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 w-52">
                {activeTab === 'people' ? 'Name' : 'Company'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 w-44">
                {activeTab === 'people' ? 'Title' : 'Industry'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 w-44">
                {activeTab === 'people' ? 'Company' : 'Size'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 w-64">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 w-40">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 w-40">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
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

  return (
    <tr className={`transition-colors ${
      isDarkMode 
        ? 'hover:bg-gray-700' 
        : 'hover:bg-gray-50'
    } ${isSelected ? isDarkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50' : ''}`}>
      <td className="px-4 py-4">
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={onSelect}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 ${
            isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
          }`}>
            {(activeTab === 'people' ? result.name : result.name).charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <button 
              onClick={() => activeTab === 'people' ? openProfileModal(result) : openCompanyModal(result)} 
              className={`text-left font-medium text-sm hover:underline text-blue-600 hover:text-blue-800 truncate block w-full ${
                isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
              }`}
              title={activeTab === 'people' ? result.name : result.name}
            >
              {activeTab === 'people' ? result.name : result.name}
            </button>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className={`text-sm text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} title={activeTab === 'people' ? result.title : result.industry}>
          <div className="truncate">{activeTab === 'people' ? result.title : result.industry}</div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center">
          {activeTab === 'people' ? (
            <>
              <Linkedin className="text-blue-500 mr-2 flex-shrink-0" size={16} />
              <button 
                onClick={() => openCompanyModal({ 
                  name: result.company, 
                  industry: 'Unknown', 
                  size: 'Unknown',     
                })} 
                className={`text-left text-sm hover:underline truncate flex-1 ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                }`}
                title={result.company}
              >
                {result.company}
              </button>
            </>
          ) : (
            <div className={`text-sm text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} title={result.size}>
              <div className="truncate">{result.size}</div>
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className={`text-sm text-left flex-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} title={result.email}>
            <div className="truncate">{activeTab === 'people' && result.email ? (showEmail ? result.email : maskEmail(result.email)) : '-'}</div>
          </div>
          {activeTab === 'people' && result.email && (
            <button 
              className={`ml-2 p-1 rounded text-xs transition-colors ${
                isDarkMode 
                  ? showEmail 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : showEmail 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              onClick={() => setShowEmail(!showEmail)}
              title={showEmail ? "Hide Email" : "Show Email"}
            >
              {showEmail ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          )}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className={`text-sm text-left flex-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} title={result.phone}>
            <div className="truncate">{activeTab === 'people' && result.phone ? (showPhone ? result.phone : maskPhone(result.phone)) : '-'}</div>
          </div>
          {activeTab === 'people' && result.phone && (
            <button 
              className={`ml-2 p-1 rounded text-xs transition-colors ${
                isDarkMode 
                  ? showPhone 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : showPhone 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              onClick={() => setShowPhone(!showPhone)}
              title={showPhone ? "Hide Phone" : "Show Phone"}
            >
              {showPhone ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          )}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center">
          <MapPin size={12} className="text-gray-400 mr-2 flex-shrink-0" />
          <div className={`text-sm text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} title={result.location}>
            <div className="truncate">{result.location || '-'}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <button 
          onClick={() => handleSave(result)}
          className={`p-2 rounded-full transition-colors ${
            result.saved 
              ? 'bg-green-100 text-green-600 hover:bg-green-200' 
              : isDarkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={result.saved ? "Saved" : "Save"}
        >
          {result.saved ? (
            <Check size={16} className="text-green-600" />
          ) : (
            <span className="text-xs font-medium">Save</span>
          )}
        </button>
      </td>
    </tr>
  );
};

export default ResultsTable;