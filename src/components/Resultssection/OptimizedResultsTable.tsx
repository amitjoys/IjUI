import React, { useState, useCallback, memo, useMemo } from 'react';
import { Linkedin, Check, Mail, Phone, MapPin, Eye, EyeOff, Globe, Building, Users } from 'lucide-react';

const OptimizedResultsTable = memo(({ results, openProfileModal, openCompanyModal, handleSave, isDarkMode, activeTab }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [customSelectCount, setCustomSelectCount] = useState('');

  const handleSelectAll = useCallback(() => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(results.map(item => item.id));
    }
    setSelectAll(!selectAll);
  }, [selectAll, results]);

  const handleSelectItem = useCallback((id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }, []);

  const handleCustomSelect = useCallback(() => {
    const count = parseInt(customSelectCount);
    if (!isNaN(count) && count > 0 && count <= results.length) {
      setSelectedItems(results.slice(0, count).map(item => item.id));
    }
  }, [customSelectCount, results]);

  return (
    <div className="h-full flex flex-col">
      {/* Enhanced selection controls */}
      <div className={`flex-shrink-0 px-4 py-3 border-b shadow-sm ${
        isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
      } backdrop-blur-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="flex items-center group">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all"
              />
              <span className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
              }`}>
                Select All
              </span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={customSelectCount}
                onChange={(e) => setCustomSelectCount(e.target.value)}
                placeholder="Count"
                className={`px-3 py-2 border rounded-lg text-sm w-20 transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button 
                onClick={handleCustomSelect}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm transition-all font-medium shadow-md hover:shadow-lg"
              >
                Select
              </button>
            </div>
          </div>
          <div className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {selectedItems.length} of {results.length} selected
          </div>
        </div>
      </div>

      {/* Optimized table container with better performance */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          {/* Enhanced sticky header */}
          <thead className={`sticky top-0 z-10 ${
            isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'
          } backdrop-blur-sm border-b ${
            isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
          } shadow-sm`}>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider w-12">
                <span className="sr-only">Select</span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider w-48">
                <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                  {activeTab === 'people' ? 'Name' : 'Company'}
                </span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider w-40">
                <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                  {activeTab === 'people' ? 'Title' : 'Industry'}
                </span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider w-40">
                <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                  {activeTab === 'people' ? 'Company' : 'Size'}
                </span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider w-56">
                <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                  {activeTab === 'people' ? 'Email' : 'Domain'}
                </span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider w-44">
                <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                  {activeTab === 'people' ? 'Phone' : 'Company Number'}
                </span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider w-36">
                <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                  Location
                </span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider w-24">
                <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            isDarkMode ? 'divide-gray-700/50' : 'divide-gray-200/50'
          }`}>
            {results.map((result) => (
              <OptimizedResultRow
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
});

const OptimizedResultRow = memo(({ result, openProfileModal, openCompanyModal, handleSave, isDarkMode, activeTab, isSelected, onSelect }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  // Memoize expensive calculations
  const maskedEmail = useMemo(() => {
    if (!result.email) return '';
    const [localPart, domain] = result.email.split('@');
    return `${localPart.slice(0, 2)}***@${domain.slice(0, 2)}***.com`;
  }, [result.email]);

  const maskedPhone = useMemo(() => {
    if (!result.phone) return '';
    return `${result.phone.slice(0, 3)}****${result.phone.slice(-3)}`;
  }, [result.phone]);

  const handleProfileClick = useCallback(() => {
    activeTab === 'people' ? openProfileModal(result) : openCompanyModal(result);
  }, [activeTab, result, openProfileModal, openCompanyModal]);

  const handleCompanyClick = useCallback(() => {
    openCompanyModal({ 
      name: result.company, 
      industry: result.industry || 'Unknown', 
      size: result.size || 'Unknown',
      domain: result.domain || `${result.company?.toLowerCase().replace(/\s+/g, '')}.com`,
      companyNumber: result.companyNumber || '+1 (555) 123-4567'
    });
  }, [result, openCompanyModal]);

  const handleSaveClick = useCallback(() => {
    handleSave(result);
  }, [result, handleSave]);

  return (
    <tr className={`transition-all duration-200 ${
      isDarkMode 
        ? 'hover:bg-gray-800/50' 
        : 'hover:bg-blue-50/50'
    } ${isSelected ? 
      isDarkMode ? 'bg-blue-900/20 border-l-4 border-blue-500' : 'bg-blue-50 border-l-4 border-blue-500' 
      : ''
    }`}>
      <td className="px-4 py-3">
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={onSelect}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all"
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 ${
            isDarkMode ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
          }`}>
            {result.name?.charAt(0) || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <button 
              onClick={handleProfileClick}
              className={`text-left font-semibold text-sm hover:underline truncate block w-full transition-colors ${
                isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
              }`}
              title={result.name}
            >
              {result.name}
            </button>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {activeTab === 'people' ? result.title : result.industry}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {activeTab === 'people' ? result.company : result.size}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className={`text-sm font-medium flex-1 truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {activeTab === 'people' ? 
              (result.email ? (showEmail ? result.email : maskedEmail) : '-') :
              (result.domain || `${result.name?.toLowerCase().replace(/\s+/g, '')}.com`)
            }
          </div>
          {activeTab === 'people' && result.email && (
            <button 
              className="p-1 rounded text-xs transition-all"
              onClick={() => setShowEmail(!showEmail)}
              title={showEmail ? "Hide Email" : "Show Email"}
            >
              {showEmail ? <EyeOff size={12} /> : <Eye size={12} />}
            </button>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className={`text-sm font-medium flex-1 truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {activeTab === 'people' ? 
              (result.phone ? (showPhone ? result.phone : maskedPhone) : '-') :
              (result.companyNumber || '+1 (555) 123-4567')
            }
          </div>
          {activeTab === 'people' && result.phone && (
            <button 
              className="p-1 rounded text-xs transition-all"
              onClick={() => setShowPhone(!showPhone)}
              title={showPhone ? "Hide Phone" : "Show Phone"}
            >
              {showPhone ? <EyeOff size={12} /> : <Eye size={12} />}
            </button>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {result.location || '-'}
        </div>
      </td>
      <td className="px-4 py-3">
        <button 
          onClick={handleSaveClick}
          className={`p-2 rounded-lg transition-all duration-200 ${
            result.saved 
              ? 'bg-green-100 text-green-600 hover:bg-green-200' 
              : isDarkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={result.saved ? "Saved" : "Save"}
        >
          {result.saved ? (
            <Check size={14} className="text-green-600" />
          ) : (
            <span className="text-xs font-medium">Save</span>
          )}
        </button>
      </td>
    </tr>
  );
});

OptimizedResultsTable.displayName = 'OptimizedResultsTable';
OptimizedResultRow.displayName = 'OptimizedResultRow';

export default OptimizedResultsTable;