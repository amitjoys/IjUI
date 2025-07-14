import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import ProfileModal from './ProfileModal';
import CompanyModal from './CompanyModal';
import ResultsTableHeader from './ResultsTableHeader';
import ResultsTableFooter from './ResultTableFooter';
import OptimizedResultsTable from './OptimizedResultsTable';

// Moved data generation outside component to prevent unnecessary re-creation
const generatePeopleData = () => [
  { id: 1, name: 'Daniel Raj David', title: 'Chief Executive Officer & Co-Founder', company: 'DeTect Technologies', email: 'daniel@detect.com', phone: '1234567890', location: 'Chennai, India', saved: false },
  { id: 2, name: 'Simon Sinek', title: 'Founder', company: 'The Curve', email: 'simon@thecurve.com', phone: '2345678901', location: 'New York, USA', saved: true },
  { id: 3, name: 'Zach W', title: 'Founder', company: 'DataExpert.io', email: 'zach@dataexpert.io', phone: '', location: 'San Francisco, USA', saved: false },
  { id: 4, name: 'Codie Sanchez', title: 'Co-Founder', company: 'Unconventional Acquisitions', email: 'codie@unconventional.com', phone: '4567890123', location: 'Austin, USA', saved: true },
  { id: 5, name: 'John Doe', title: 'CEO', company: 'ABC Corp', email: 'john@abc.com', phone: '5678901234', location: 'London, UK', saved: false },
  { id: 6, name: 'Jane Smith', title: 'CTO', company: 'XYZ Inc.', email: 'jane@xyz.com', phone: '6789012345', location: 'Toronto, Canada', saved: false },
  { id: 7, name: 'Michael Chen', title: 'VP of Engineering', company: 'TechCorp', email: 'michael@techcorp.com', phone: '7890123456', location: 'Singapore', saved: false },
  { id: 8, name: 'Sarah Johnson', title: 'Head of Product', company: 'InnovateLabs', email: 'sarah@innovatelabs.com', phone: '8901234567', location: 'Berlin, Germany', saved: false },
  { id: 9, name: 'David Wilson', title: 'Chief Marketing Officer', company: 'GrowthCo', email: 'david@growthco.com', phone: '9012345678', location: 'Sydney, Australia', saved: true },
  { id: 10, name: 'Emily Davis', title: 'Director of Sales', company: 'SalesForce Pro', email: 'emily@salesforcepro.com', phone: '0123456789', location: 'Mumbai, India', saved: false },
  { id: 11, name: 'Alex Rodriguez', title: 'Lead Designer', company: 'DesignStudio', email: 'alex@designstudio.com', phone: '1234567890', location: 'Barcelona, Spain', saved: false },
  { id: 12, name: 'Lisa Wang', title: 'Data Scientist', company: 'AI Insights', email: 'lisa@aiinsights.com', phone: '2345678901', location: 'Tokyo, Japan', saved: false },
];

const generateCompanyData = () => [
  { id: 1, name: 'DeTect Technologies', industry: 'AI & Machine Learning', size: '50-100', location: 'Chennai, India', saved: false },
  { id: 2, name: 'The Curve', industry: 'Business Consulting', size: '10-50', location: 'New York, USA', saved: true },
  { id: 3, name: 'DataExpert.io', industry: 'Data Analytics', size: '100-500', location: 'San Francisco, USA', saved: false },
  { id: 4, name: 'Unconventional Acquisitions', industry: 'Investment & Finance', size: '10-50', location: 'Austin, USA', saved: true },
  { id: 5, name: 'ABC Corp', industry: 'Enterprise Software', size: '1000+', location: 'London, UK', saved: false },
  { id: 6, name: 'XYZ Inc.', industry: 'Cloud Computing', size: '500-1000', location: 'Toronto, Canada', saved: false },
  { id: 7, name: 'TechCorp', industry: 'Cybersecurity', size: '200-500', location: 'Singapore', saved: false },
  { id: 8, name: 'InnovateLabs', industry: 'Product Development', size: '50-100', location: 'Berlin, Germany', saved: false },
  { id: 9, name: 'GrowthCo', industry: 'Marketing Technology', size: '100-200', location: 'Sydney, Australia', saved: true },
];

export const OptimizedResultsTableAndModals = memo(({ isDarkMode, activeTab }) => {
  const [activeResultsTab, setActiveResultsTab] = useState('total');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize data generation to prevent unnecessary re-creation
  const totalData = useMemo(() => 
    activeTab === 'people' ? generatePeopleData() : generateCompanyData(), 
    [activeTab]
  );

  // Derive filtered data from totalData
  const netNewData = useMemo(() => totalData.filter(item => !item.saved), [totalData]);
  const savedData = useMemo(() => totalData.filter(item => item.saved), [totalData]);

  // Memoize current data to prevent unnecessary re-computation
  const getCurrentData = useMemo(() => {
    switch (activeResultsTab) {
      case 'total':
        return totalData;
      case 'netNew':
        return netNewData;
      case 'saved':
        return savedData;
      default:
        return totalData;
    }
  }, [activeResultsTab, totalData, netNewData, savedData]);

  const openProfileModal = useCallback((profile) => {
    setSelectedProfile({
      ...profile,
      website: `www.${profile.company.toLowerCase().replace(' ', '')}.com`,
      industry: 'Business Intelligence (BI) Software',
      employees: '201 - 500',
      revenue: '$93.9M',
      about: `${profile.name} is the ${profile.title} at ${profile.company} based in ${profile.location}. Experienced professional with expertise in ${profile.title.toLowerCase()}.`,
      currentJob: `${profile.title} at ${profile.company}`
    });
    setIsProfileModalOpen(true);
  }, []);

  const openCompanyModal = useCallback((company) => {
    setSelectedCompany({
      name: company.name,
      industry: company.industry || 'Technology',
      size: company.size || '50-100 employees',
      location: company.location || 'San Francisco, CA',
      founded: '2015',
      website: `www.${company.name.toLowerCase().replace(' ', '')}.com`,
      linkedin: `linkedin.com/company/${company.name.toLowerCase().replace(' ', '')}`
    });
    setIsCompanyModalOpen(true);
  }, []);

  const handleSave = useCallback((item) => {
    // Since we can't directly mutate the generated data, we'll simulate the save
    // In a real app, this would update the backend and refresh the data
    console.log('Saving item:', item);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className={`h-full flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <ResultsTableHeader
        activeResultsTab={activeResultsTab}
        setActiveResultsTab={setActiveResultsTab}
        isDarkMode={isDarkMode}
        totalCount={totalData.length}
        netNewCount={netNewData.length}
        savedCount={savedData.length}
      />
      
      <div className="flex-1 overflow-hidden">
        <OptimizedResultsTable
          results={getCurrentData}
          openProfileModal={openProfileModal}
          openCompanyModal={openCompanyModal}
          handleSave={handleSave}
          isDarkMode={isDarkMode}
          activeTab={activeTab}
        />
      </div>
      
      <ResultsTableFooter 
        isDarkMode={isDarkMode} 
        currentPage={currentPage}
        totalPages={Math.ceil(getCurrentData.length / 25)}
        onPageChange={handlePageChange}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        closeModal={() => setIsProfileModalOpen(false)}
        profile={selectedProfile}
        isDarkMode={isDarkMode}
      />

      <CompanyModal
        isOpen={isCompanyModalOpen}
        closeModal={() => setIsCompanyModalOpen(false)}
        company={selectedCompany}
        isDarkMode={isDarkMode}
      />
    </div>
  );
});

OptimizedResultsTableAndModals.displayName = 'OptimizedResultsTableAndModals';

export default OptimizedResultsTableAndModals;