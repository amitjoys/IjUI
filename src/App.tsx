import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AnalyticsDashboard from './components/Dashboard/AnalyticsDashboard';

const ApolloDashboard = lazy(() => import('./components/Dashboard/ApolloDashboard'));
const ProfilePage = lazy(() => import('./components/Pages/ProfilePage'));
const BillingPage = lazy(() => import('./components/Pages/BillingPage'));
const LoginPage = lazy(() => import('./components/Pages/Login'));
const RegistrationPage = lazy(() => import('./components/Pages/Registration'));
const ErrorPage = lazy(() => import('./components/Pages/Errors'));
const SequenceStartPage = lazy(() => import('./components/Pages/Sequence/SequenceStartPage'));
const SequenceBuilderPage = lazy(() => import('./components/Pages/Sequence/SequenceBuilderPage'));
const UserManagement = lazy(() => import('./components/Pages/UserMangement'));

const MainLayout = ({ children, isDarkMode, toggleDarkMode, isSidebarCollapsed, toggleSidebar, showWebsiteFilters, toggleWebsiteFilters }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isErrorPage = location.pathname === '/error';

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
};

const App = () => {
  const [sequences, setSequences] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showWebsiteFilters, setShowWebsiteFilters] = useState(false);
  const [searchFiltersVisible, setSearchFiltersVisible] = useState(true);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleWebsiteFilters = () => setShowWebsiteFilters(!showWebsiteFilters);
  const toggleSearchFiltersVisibility = () => setSearchFiltersVisible(!searchFiltersVisible);
  
  const addSequence = (newSequence) => {
    setSequences([...sequences, newSequence]);
  };

  const addStep = (sequenceId, step) => {
    setSequences(prevSequences => prevSequences.map(seq => 
      seq.id === sequenceId 
        ? { ...seq, steps: [...(seq.steps || []), step] }
        : seq
    ));
  };

  return (
    <Router>
      <MainLayout
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        showWebsiteFilters={showWebsiteFilters}
        toggleWebsiteFilters={toggleWebsiteFilters}
      >
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Loading...</div>
          </div>
        }>
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
            <Route path="*" element={<ErrorPage isDarkMode={isDarkMode} />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
};

export default App;