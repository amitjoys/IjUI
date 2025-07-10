import React, { useState, useEffect, lazy, Suspense } from 'react';
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
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-lg font-semibold mb-3">Search</h1>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Filters */}
        {isSearchFilterVisible && (
          <div className="w-80 flex-shrink-0 border-r border-gray-200 dark:border-gray-700">
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
          <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
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