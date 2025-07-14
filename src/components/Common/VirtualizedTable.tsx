import React, { useMemo, useCallback, memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Linkedin, Check, Mail, Phone, MapPin, Eye, EyeOff, Globe, Building, Users } from 'lucide-react';

interface VirtualizedTableProps {
  results: any[];
  openProfileModal: (profile: any) => void;
  openCompanyModal: (company: any) => void;
  handleSave: (item: any) => void;
  isDarkMode: boolean;
  activeTab: string;
  selectedItems: string[];
  onSelectItem: (id: string) => void;
}

const ITEM_HEIGHT = 80;

const VirtualizedTable: React.FC<VirtualizedTableProps> = memo(({
  results,
  openProfileModal,
  openCompanyModal,
  handleSave,
  isDarkMode,
  activeTab,
  selectedItems,
  onSelectItem
}) => {
  const RowRenderer = useCallback(({ index, style }) => {
    const result = results[index];
    if (!result) return null;
    
    return (
      <div style={style}>
        <VirtualizedRow
          result={result}
          openProfileModal={openProfileModal}
          openCompanyModal={openCompanyModal}
          handleSave={handleSave}
          isDarkMode={isDarkMode}
          activeTab={activeTab}
          isSelected={selectedItems.includes(result.id)}
          onSelect={() => onSelectItem(result.id)}
        />
      </div>
    );
  }, [results, openProfileModal, openCompanyModal, handleSave, isDarkMode, activeTab, selectedItems, onSelectItem]);

  return (
    <div className="h-full">
      {/* Table Header */}
      <div className={`sticky top-0 z-10 ${
        isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'
      } backdrop-blur-sm border-b ${
        isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
      } shadow-sm`}>
        <div className="grid grid-cols-8 gap-4 px-4 py-3 text-xs font-bold uppercase tracking-wider">
          <div className="col-span-1">
            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>Select</span>
          </div>
          <div className="col-span-2">
            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
              {activeTab === 'people' ? 'Name' : 'Company'}
            </span>
          </div>
          <div className="col-span-1">
            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
              {activeTab === 'people' ? 'Title' : 'Industry'}
            </span>
          </div>
          <div className="col-span-1">
            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
              {activeTab === 'people' ? 'Company' : 'Size'}
            </span>
          </div>
          <div className="col-span-1">
            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
              {activeTab === 'people' ? 'Email' : 'Domain'}
            </span>
          </div>
          <div className="col-span-1">
            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
              {activeTab === 'people' ? 'Phone' : 'Company Number'}
            </span>
          </div>
          <div className="col-span-1">
            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>Actions</span>
          </div>
        </div>
      </div>

      {/* Virtualized Content */}
      <List
        height={400}
        itemCount={results.length}
        itemSize={ITEM_HEIGHT}
        overscanCount={5}
      >
        {RowRenderer}
      </List>
    </div>
  );
});

const VirtualizedRow: React.FC<any> = memo(({ result, openProfileModal, openCompanyModal, handleSave, isDarkMode, activeTab, isSelected, onSelect }) => {
  const [showEmail, setShowEmail] = React.useState(false);
  const [showPhone, setShowPhone] = React.useState(false);

  const maskEmail = useCallback((email: string) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    return `${localPart.slice(0, 2)}***@${domain.slice(0, 2)}***.com`;
  }, []);

  const maskPhone = useCallback((phone: string) => {
    if (!phone) return '';
    return `${phone.slice(0, 3)}****${phone.slice(-3)}`;
  }, []);

  const handleProfileClick = useCallback(() => {
    activeTab === 'people' ? openProfileModal(result) : openCompanyModal(result);
  }, [activeTab, result, openProfileModal, openCompanyModal]);

  const handleSaveClick = useCallback(() => {
    handleSave(result);
  }, [result, handleSave]);

  return (
    <div className={`grid grid-cols-8 gap-4 px-4 py-3 border-b transition-colors duration-200 ${
      isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
    } ${
      isDarkMode 
        ? 'hover:bg-gray-800/50' 
        : 'hover:bg-blue-50/50'
    } ${isSelected ? 
      isDarkMode ? 'bg-blue-900/20 border-l-4 border-blue-500' : 'bg-blue-50 border-l-4 border-blue-500' 
      : ''
    }`}>
      
      {/* Checkbox */}
      <div className="col-span-1 flex items-center">
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={onSelect}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all"
        />
      </div>

      {/* Name/Company */}
      <div className="col-span-2 flex items-center">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold mr-3 flex-shrink-0 ${
          isDarkMode ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
        }`}>
          {result.name?.charAt(0) || 'U'}
        </div>
        <button 
          onClick={handleProfileClick}
          className={`text-left font-semibold text-sm hover:underline truncate transition-colors ${
            isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
          }`}
          title={result.name}
        >
          {result.name}
        </button>
      </div>

      {/* Title/Industry */}
      <div className="col-span-1 flex items-center">
        <div className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {activeTab === 'people' ? result.title : result.industry}
        </div>
      </div>

      {/* Company/Size */}
      <div className="col-span-1 flex items-center">
        <div className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {activeTab === 'people' ? result.company : result.size}
        </div>
      </div>

      {/* Email/Domain */}
      <div className="col-span-1 flex items-center">
        <div className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {activeTab === 'people' ? 
            (result.email ? (showEmail ? result.email : maskEmail(result.email)) : '-') :
            (result.domain || `${result.name?.toLowerCase().replace(/\s+/g, '')}.com`)
          }
        </div>
        {activeTab === 'people' && result.email && (
          <button 
            className="ml-2 p-1 rounded text-xs transition-all"
            onClick={() => setShowEmail(!showEmail)}
            title={showEmail ? "Hide Email" : "Show Email"}
          >
            {showEmail ? <EyeOff size={12} /> : <Eye size={12} />}
          </button>
        )}
      </div>

      {/* Phone/Company Number */}
      <div className="col-span-1 flex items-center">
        <div className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {activeTab === 'people' ? 
            (result.phone ? (showPhone ? result.phone : maskPhone(result.phone)) : '-') :
            (result.companyNumber || '+1 (555) 123-4567')
          }
        </div>
        {activeTab === 'people' && result.phone && (
          <button 
            className="ml-2 p-1 rounded text-xs transition-all"
            onClick={() => setShowPhone(!showPhone)}
            title={showPhone ? "Hide Phone" : "Show Phone"}
          >
            {showPhone ? <EyeOff size={12} /> : <Eye size={12} />}
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="col-span-1 flex items-center">
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
      </div>
    </div>
  );
});

VirtualizedTable.displayName = 'VirtualizedTable';
VirtualizedRow.displayName = 'VirtualizedRow';

export default VirtualizedTable;