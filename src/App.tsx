import React, { useState, lazy, Suspense, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import type { Sequence, SequenceStep, LayoutProps } from './types';

// Lazy load components with prefetch strategy - Using optimized version
const ApolloDashboard = lazy(() => 
  import('./components/Dashboard/OptimizedApolloDashboard').then(module => ({ default: module.default }))
);
const AnalyticsDashboard = lazy(() => 
  import('./components/Dashboard/AnalyticsDashboard').then(module => ({ default: module.default }))
);
const ProfilePage = lazy(() => 
  import('./components/Pages/ProfilePage').then(module => ({ default: module.default }))
);
const BillingPage = lazy(() => 
  import('./components/Pages/BillingPage').then(module => ({ default: module.default }))
);
const LoginPage = lazy(() => 
  import('./components/Pages/Login').then(module => ({ default: module.default }))
);
const RegistrationPage = lazy(() => 
  import('./components/Pages/Registration').then(module => ({ default: module.default }))
);
const ErrorPage = lazy(() => 
  import('./components/Pages/Errors').then(module => ({ default: module.default }))
);
const SequenceStartPage = lazy(() => 
  import('./components/Pages/Sequence/SequenceStartPage').then(module => ({ default: module.default }))
);
const SequenceBuilderPage = lazy(() => 
  import('./components/Pages/Sequence/SequenceBuilderPage').then(module => ({ default: module.default }))
);
const UserManagement = lazy(() => 
  import('./components/Pages/UserManagement').then(module => ({ default: module.default }))
);
const AdminPanel = lazy(() => 
  import('./components/Pages/AdminPanel').then(module => ({ default: module.default }))
);

// Optimized loading component
const LoadingSpinner = React.memo(() => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
    <span className="ml-3 text-sm text-gray-600">Loading...</span>
  </div>
));

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="flex items-center justify-center h-64 text-center">
    <div className="p-6 bg-red-50 rounded-lg">
      <h2 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h2>
      <p className="text-red-600 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
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

  const isIJManagePage = useMemo(() => 
    location.pathname.startsWith('/IJManage'), 
    [location.pathname]
  );

  if (isAuthPage || isErrorPage || isIJManagePage) {
    return <>{children}</>;
  }

  return (
    <div className={`flex h-screen w-full overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="flex-shrink-0 h-full z-30">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          toggleSidebar={toggleSidebar} 
          isDarkMode={isDarkMode}
          showWebsiteFilters={showWebsiteFilters}
          toggleWebsiteFilters={toggleWebsiteFilters}
        />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <div className="flex-shrink-0 z-20">
          <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>
        
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 custom-scrollbar">
          <div className="min-h-full">
            {children}
          </div>
        </main>
        
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

  // Memoized callbacks
  const toggleDarkMode = useCallback(() => setIsDarkMode(prev => !prev), []);
  const toggleSidebar = useCallback(() => setIsSidebarCollapsed(prev => !prev), []);
  const toggleWebsiteFilters = useCallback(() => setShowWebsiteFilters(prev => !prev), []);
  const toggleSearchFiltersVisibility = useCallback(() => setSearchFiltersVisible(prev => !prev), []);
  
  const addSequence = useCallback((newSequence: Sequence) => {
    setSequences(prev => [...prev, newSequence]);
  }, []);

  const addStep = useCallback((sequenceId: string, step: SequenceStep) => {
    setSequences(prevSequences => prevSequences.map(seq => 
      seq.id === sequenceId 
        ? { ...seq, steps: [...(seq.steps || []), step] }
        : seq
    ));
  }, []);

  // Memoized layout props
  const layoutProps = useMemo(() => ({
    isDarkMode,
    toggleDarkMode,
    isSidebarCollapsed,
    toggleSidebar,
    showWebsiteFilters,
    toggleWebsiteFilters
  }), [isDarkMode, toggleDarkMode, isSidebarCollapsed, toggleSidebar, showWebsiteFilters, toggleWebsiteFilters]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
    </ErrorBoundary>
  );
};

export default App;