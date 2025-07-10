import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw, Download, Upload, MoreHorizontal, Linkedin, Check, Mail, Phone } from 'lucide-react';

import ProfileModal from './ProfileModal';
import CompanyModal from './CompanyModal';
import ResultsTable from './ResultsTable';
import ResultsTableHeader from './ResultsTableHeader';
import ResultsTableFooter from './ResultTableFooter';

export const ResultsTableAndModals = ({ isDarkMode, activeTab }) => {
  const [activeResultsTab, setActiveResultsTab] = useState('total');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [totalData, setTotalData] = useState([]);
  const [netNewData, setNetNewData] = useState([]);
  const [savedData, setSavedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchedData = fetchData(activeTab);
    setTotalData(fetchedData);
    setNetNewData(fetchedData.filter(item => !item.saved));
    setSavedData(fetchedData.filter(item => item.saved));
  }, [activeTab]);

  const fetchData = (tab) => {
    return tab === 'people' ? generatePeopleData() : generateCompanyData();
  };

  const generatePeopleData = () => {
    return [
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
  };

  const generateCompanyData = () => {
    return [
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
  };

  const getCurrentData = () => {
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
  };

  const openProfileModal = (profile) => {
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
  };

  const openCompanyModal = (company) => {
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
  };  

  const handleSave = (item) => {
    const updatedTotalData = totalData.map(d => d.id === item.id ? {...d, saved: !d.saved} : d);
    setTotalData(updatedTotalData);
    setNetNewData(updatedTotalData.filter(d => !d.saved));
    setSavedData(updatedTotalData.filter(d => d.saved));
  };

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
        <ResultsTable
          results={getCurrentData()}
          openProfileModal={openProfileModal}
          openCompanyModal={openCompanyModal}
          handleSave={handleSave}
          isDarkMode={isDarkMode}
          activeTab={activeTab}
        />
      </div>
      
      <ResultsTableFooter 
        isDarkMode={isDarkMode} 
        currentPage={1}
        totalPages={Math.ceil(getCurrentData().length / 25)}
        onPageChange={(page) => console.log('Change to page', page)}
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
};

export default ResultsTableAndModals;