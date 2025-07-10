import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Filter, FilterX } from 'lucide-react';
import TabNavigation from './TabNavigation';
import SearchAndFilterSection from './SearchAndFilterSection';
import UpgradeBanner from './UpgradeBanner';
import type { DashboardProps } from '../../types';

const LazyResultsTableAndModals = lazy(() => import('../Resultssection/ResultsTableAndModals'));

const ApolloDashboard: React.FC<DashboardProps> = ({ 
  isDarkMode, 
  showWebsiteFilters, 
  searchFiltersVisible, 
  toggleSearchFiltersVisibility 
}) => {
  const [activeTab, setActiveTab] = useState<string>('people');
  const [isSearchFilterVisible, setIsSearchFilterVisible] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const toggleSearchFilterVisibility = (): void => setIsSearchFilterVisible(!isSearchFilterVisible);

  useEffect(() => {
    const handleResize = (): void => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header Section */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-base font-semibold">Search</h1>
          {/* Filter Toggle Button - Always Visible */}
          <button
            onClick={toggleSearchFilterVisibility}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600' 
                : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-300'
            }`}
            title={isSearchFilterVisible ? 'Hide Filters' : 'Show Filters'}
          >
            {isSearchFilterVisible ? (
              <>
                <FilterX size={14} />
                <span>Hide Filters</span>
              </>
            ) : (
              <>
                <Filter size={14} />
                <span>Show Filters</span>
              </>
            )}
          </button>
        </div>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Filters */}
        {isSearchFilterVisible && (
          <div className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-700">
            <SearchAndFilterSection
              activeTab={activeTab}
              isDarkMode={isDarkMode}
              isVisible={isSearchFilterVisible}
              toggleVisibility={toggleSearchFilterVisibility}
            />
          </div>
        )}

        {/* Results Area - Full Width */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Upgrade Banner */}
          <div className="flex-shrink-0 p-3 border-b border-gray-200 dark:border-gray-700">
            <UpgradeBanner isDarkMode={isDarkMode} />
          </div>

          {/* Results Table - Full Height */}
          <div className="flex-1 overflow-hidden">
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="text-sm text-gray-500">Loading...</div>
              </div>
            }>
              <LazyResultsTableAndModals isDarkMode={isDarkMode} activeTab={activeTab} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApolloDashboard;