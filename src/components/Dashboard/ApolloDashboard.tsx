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

  const getGridColumns = (): string => {
    if (windowWidth < 640) return 'grid-cols-1';
    if (windowWidth < 1024) return 'grid-cols-2';
    return 'grid-cols-4';
  };

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
      <div className={`grid ${getGridColumns()} gap-4`}>
        <div className={`col-span-1 ${isSearchFilterVisible ? '' : 'mb-4'}`}>
          <SearchAndFilterSection
            activeTab={activeTab}
            isDarkMode={isDarkMode}
            isVisible={isSearchFilterVisible}
            toggleVisibility={toggleSearchFilterVisibility}
          />
        </div>
        <div className={`${windowWidth < 1024 ? 'col-span-1' : 'col-span-3'} ${isSearchFilterVisible ? '' : 'col-span-full'}`}>
          <UpgradeBanner isDarkMode={isDarkMode} />
          <div className="h-[calc(100vh-300px)] overflow-y-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <LazyResultsTableAndModals isDarkMode={isDarkMode} activeTab={activeTab} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApolloDashboard;
