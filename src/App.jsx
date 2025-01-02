
import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';


const ApolloDashboard = lazy(() => import('./components/Dashboard/ApolloDashboard'));
const ProfilePage = lazy(() => import('./components/Pages/ProfilePage'));
const BillingPage = lazy(() => import('./components/Pages/BillingPage'));
const BillingPage2 = lazy(() => import('./components/Pages/BillingPage2'));
const BillingPage3 = lazy(() => import('./components/Pages/BillingPage3'));
const LoginPage = lazy(() => import('./components/Pages/Login'));
const RegistrationPage = lazy(() => import('./components/Pages/Registration'));
const ErrorPage = lazy(() => import('./components/Pages/Errors'));
const SequenceStartPage = lazy(() => import('./components/Pages/Sequence/SequenceStartPage'));
const SequenceBuilderPage = lazy(() => import('./components/Pages/Sequence/SequenceBuilderPage'));
const UserManagementPage = lazy(() => import('./components/Pages/UserManagementPage'));
const UserManagement = lazy(() => import('./components/Pages/UserMangement'));

const MainLayout = ({ children, isDarkMode, toggleDarkMode, isSidebarCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isErrorPage = location.pathname === '/error';

  if (isAuthPage || isErrorPage) {
    return <>{children}</>;
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} isDarkMode={isDarkMode} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

const App = () => {
  const [sequences, setSequences] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  
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
      >
        <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
          <Routes>
            <Route path="/" element={<ApolloDashboard isDarkMode={isDarkMode} />} />
            <Route path="/profile" element={<ProfilePage isDarkMode={isDarkMode} />} />
            <Route path="/billing" element={<BillingPage isDarkMode={isDarkMode} />} />
            <Route path="/billing2" element={<BillingPage2 isDarkMode={isDarkMode} />} />
            <Route path="/billing3" element={<BillingPage3 isDarkMode={isDarkMode} />} />
            <Route path="/team" element={<UserManagementPage isDarkMode={isDarkMode} />} />          
            <Route path="/team2" element={<UserManagement isDarkMode={isDarkMode} />} />
            <Route path="/login" element={<LoginPage isDarkMode={isDarkMode} />} />
            <Route path="/register" element={<RegistrationPage isDarkMode={isDarkMode} />} />
            <Route path="/error" element={<ErrorPage isDarkMode={isDarkMode} />} />
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
