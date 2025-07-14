import React, { useState, useEffect, lazy, Suspense, useCallback, memo } from 'react';
import { Filter, FilterX } from 'lucide-react';
import TabNavigation from './TabNavigation';
import SearchAndFilterSection from './SearchAndFilterSection';
import UpgradeBanner from './UpgradeBanner';
import type { DashboardProps } from '../../types';

// Lazy load with preload for better performance
const LazyResultsTableAndModals = lazy(() => import('../Resultssection/ResultsTableAndModals'));

// Optimized loading component
const QuickLoadingSpinner = memo(() => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-pulse rounded-full h-6 w-6 bg-blue-500 opacity-75"></div>
    <div className="ml-2 text-gray-500 text-sm">Loading results...</div>
  </div>
));

const ApolloDashboard: React.FC<DashboardProps> = memo(({ 
  isDarkMode, 
  showWebsiteFilters, 
  searchFiltersVisible, 
  toggleSearchFiltersVisibility 
}) => {
  const [activeTab, setActiveTab] = useState<string>('people');
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  // Use the prop from parent component instead of local state
  const isSearchFilterVisible = searchFiltersVisible;
  const toggleSearchFilterVisibility = toggleSearchFiltersVisibility;

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Preload the results component immediately - NO ARTIFICIAL DELAY
  useEffect(() => {
    const preloadResults = async () => {
      try {
        await import('../Resultssection/ResultsTableAndModals');
      } catch (error) {
        console.warn('Failed to preload results component:', error);
      }
    };
    preloadResults();
  }, []);

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Compact Header Section */}
      <div className="flex-shrink-0 px-3 py-2.5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-sm font-semibold">Search</h1>
          {/* Filter Toggle Button - Always Visible */}
          <button
            onClick={toggleSearchFilterVisibility}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600' 
                : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-300'
            }`}
            title={isSearchFilterVisible ? 'Hide Filters' : 'Show Filters'}
          >
            {isSearchFilterVisible ? (
              <>
                <FilterX size={12} />
                <span>Hide Filters</span>
              </>
            ) : (
              <>
                <Filter size={12} />
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
          <div className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-700">
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
          <div className="flex-shrink-0 p-2.5 border-b border-gray-200 dark:border-gray-700">
            <UpgradeBanner isDarkMode={isDarkMode} />
          </div>

          {/* Results Table - Immediate Loading */}
          <div className="flex-1 overflow-hidden">
            <Suspense fallback={<QuickLoadingSpinner />}>
              <LazyResultsTableAndModals isDarkMode={isDarkMode} activeTab={activeTab} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
});

ApolloDashboard.displayName = 'ApolloDashboard';

export default ApolloDashboard;