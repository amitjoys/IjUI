import React, { useState, lazy, Suspense, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import type { Sequence, SequenceStep, LayoutProps } from './types';

// Lazy load all components for better performance with preload
const ApolloDashboard = lazy(() => import('./components/Dashboard/ApolloDashboard'));
const AnalyticsDashboard = lazy(() => import('./components/Dashboard/AnalyticsDashboard'));
const ProfilePage = lazy(() => import('./components/Pages/ProfilePage'));
const BillingPage = lazy(() => import('./components/Pages/BillingPage'));
const LoginPage = lazy(() => import('./components/Pages/Login'));
const RegistrationPage = lazy(() => import('./components/Pages/Registration'));
const ErrorPage = lazy(() => import('./components/Pages/Errors'));
const SequenceStartPage = lazy(() => import('./components/Pages/Sequence/SequenceStartPage'));
const SequenceBuilderPage = lazy(() => import('./components/Pages/Sequence/SequenceBuilderPage'));
const UserManagement = lazy(() => import('./components/Pages/UserManagement'));
const AdminPanel = lazy(() => import('./components/Pages/AdminPanel'));

// Optimized loading component with faster animation
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-pulse rounded-full h-8 w-8 bg-blue-500 opacity-75"></div>
    <div className="ml-3 text-gray-500">Loading...</div>
  </div>
);

const MainLayout: React.FC<LayoutProps> = React.memo(({ 
  children, 
  isDarkMode, 
  toggleDarkMode, 
  isSidebarCollapsed, 
  toggleSidebar, 
  showWebsiteFilters, 
  toggleWebsiteFilters 
}) => {
  const location = useLocation();
  
  const isAuthPage = useMemo(() => 
    ['/login', '/register'].includes(location.pathname), 
    [location.pathname]
  );
  
  const isErrorPage = useMemo(() => 
    location.pathname === '/error', 
    [location.pathname]
  );

  if (isAuthPage || isErrorPage) {
    return <>{children}</>;
  }

  return (
    <div className={`flex h-screen w-full overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Fixed sidebar with full height */}
      <div className="flex-shrink-0 h-full z-30">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          toggleSidebar={toggleSidebar} 
          isDarkMode={isDarkMode}
          showWebsiteFilters={showWebsiteFilters}
          toggleWebsiteFilters={toggleWebsiteFilters}
        />
      </div>
      
      {/* Main content area with header and footer */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Fixed header */}
        <div className="flex-shrink-0 z-20">
          <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>
        
        {/* Scrollable main content area */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
          <div className="min-h-full flex flex-col">
            {children}
          </div>
        </main>
        
        {/* Fixed footer */}
        <div className="flex-shrink-0 z-20">
          <Footer isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
});

MainLayout.displayName = 'MainLayout';

const App: React.FC = () => {
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [showWebsiteFilters, setShowWebsiteFilters] = useState<boolean>(false);
  const [searchFiltersVisible, setSearchFiltersVisible] = useState<boolean>(true);

  // Memoize callback functions to prevent unnecessary re-renders
  const toggleDarkMode = useCallback((): void => setIsDarkMode(prev => !prev), []);
  const toggleSidebar = useCallback((): void => setIsSidebarCollapsed(prev => !prev), []);
  const toggleWebsiteFilters = useCallback((): void => setShowWebsiteFilters(prev => !prev), []);
  const toggleSearchFiltersVisibility = useCallback((): void => setSearchFiltersVisible(prev => !prev), []);
  
  const addSequence = useCallback((newSequence: Sequence): void => {
    setSequences(prev => [...prev, newSequence]);
  }, []);

  const addStep = useCallback((sequenceId: string, step: SequenceStep): void => {
    setSequences(prevSequences => prevSequences.map(seq => 
      seq.id === sequenceId 
        ? { ...seq, steps: [...(seq.steps || []), step] }
        : seq
    ));
  }, []);

  // Memoize layout props to prevent unnecessary re-renders
  const layoutProps = useMemo(() => ({
    isDarkMode,
    toggleDarkMode,
    isSidebarCollapsed,
    toggleSidebar,
    showWebsiteFilters,
    toggleWebsiteFilters
  }), [isDarkMode, toggleDarkMode, isSidebarCollapsed, toggleSidebar, showWebsiteFilters, toggleWebsiteFilters]);

  return (
    <Router>
      <MainLayout {...layoutProps}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={
              <ApolloDashboard 
                isDarkMode={isDarkMode} 
                showWebsiteFilters={showWebsiteFilters}
                searchFiltersVisible={searchFiltersVisible}
                toggleSearchFiltersVisibility={toggleSearchFiltersVisibility}
              />
            } />
            <Route path="/profile" element={<ProfilePage isDarkMode={isDarkMode} />} />
            <Route path="/billing" element={<BillingPage isDarkMode={isDarkMode} />} />
            <Route path="/team" element={<UserManagement isDarkMode={isDarkMode} />} />
            <Route path="/login" element={<LoginPage isDarkMode={isDarkMode} />} />
            <Route path="/register" element={<RegistrationPage isDarkMode={isDarkMode} />} />
            <Route path="/error" element={<ErrorPage isDarkMode={isDarkMode} />} />
            <Route path="/analytics" element={<AnalyticsDashboard isDarkMode={isDarkMode} />} />
            <Route 
              path="/sequences" 
              element={<SequenceStartPage isDarkMode={isDarkMode} sequences={sequences} addSequence={addSequence} />} 
            />
            <Route 
              path="/sequences/main/:id" 
              element={<SequenceBuilderPage isDarkMode={isDarkMode} sequences={sequences} addStep={addStep} />}
            />
            <Route path="/IJManage/*" element={<AdminPanel isDarkMode={isDarkMode} />} />
            <Route path="*" element={<ErrorPage isDarkMode={isDarkMode} />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
};

export default App;