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
      { id: 1, name: 'Daniel Raj David', title: 'Chief Executive Officer & Co-Founder', company: 'DeTect Technologies', email: 'daniel@detect.com', phone: '1234567890', saved: false },
      { id: 2, name: 'Simon Sinek', title: 'Founder', company: 'The Curve', email: 'simon@thecurve.com', phone: '2345678901', saved: true },
      { id: 3, name: 'Zach W', title: 'Founder', company: 'DataExpert.io', email: 'zach@dataexpert.io', phone: '', saved: false },
      { id: 4, name: 'Codie Sanchez', title: 'Co-Founder', company: 'Unconventional Acquisitions', email: 'codie@unconventional.com', phone: '4567890123', saved: true },
      { id: 5, name: 'John Doe', title: 'CEO', company: 'ABC Corp', email: 'john@abc.com', phone: '5678901234', saved: false },
      { id: 6, name: 'Jane Smith', title: 'CTO', company: 'XYZ Inc.', email: 'jane@xyz.com', phone: '6789012345', saved: false },
      { id: 7, name: 'Jane Doe', title: 'COO', company: 'XYZ Inc.', email: 'jane@xyz.com', phone: '6789012345', saved: false },
      { id: 8, name: 'John Smith', title: 'CFO', company: 'XYZ Inc.', email: 'john@xyz.com', phone: '6789012345', saved: false },
      { id: 9, name: 'Jane Doe', title: 'COO', company: 'XYZ Inc.', email: 'jane@xyz.com', phone: '6789012345', saved: false },
      { id: 10, name: 'John Smith', title: 'CFO', company: 'XYZ Inc.', email: 'john@xyz.com', phone: '6789012345', saved: false },
      { id: 11, name: 'Jane Doe', title: 'COO', company: 'XYZ Inc.', email: 'jane@xyz.com', phone: '6789012345', saved: false },
      { id: 12, name: 'John Smith', title: 'CFO', company: 'XYZ Inc.', email: 'john@xyz.com', phone: '6789012345', saved: false },
    
    ];
  };

  const generateCompanyData = () => {
    return [
      { id: 1, name: 'DeTect Technologies', industry: 'Technology', size: '50-100', saved: false },
      { id: 2, name: 'The Curve', industry: 'Consulting', size: '10-50', saved: true },
      { id: 3, name: 'DataExpert.io', industry: 'Data Analytics', size: '100-500', saved: false },
      { id: 4, name: 'Unconventional Acquisitions', industry: 'Finance', size: '10-50', saved: true },
      { id: 5, name: 'ABC Corp', industry: 'Technology', size: '1000+', saved: false },
      { id: 6, name: 'XYZ Inc.', industry: 'Consulting', size: '50-100', saved: false },
      { id: 7, name: 'XYZ Inc.', industry: 'Consulting', size: '10-50', saved: false },
      { id: 8, name: 'XYZ Inc.', industry: 'Consulting', size: '10-50', saved: false },
      { id: 9, name: 'XYZ Inc.', industry: 'Consulting', size: '10-50', saved: true },

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
      location: 'Module 2a Fl 3 Ttti Taramani, Tamil Nadu 600113, India',
      industry: 'Business Intelligence (BI) Software',
      employees: '201 - 500',
      revenue: '$93.9M',
      about: `${profile.name} is the ${profile.title} at ${profile.company} based in Ttti Taramani, Tamil Nadu. ${profile.name} received a Engineer's degree from Indian Institute of Technology, Madras.`,
      currentJob: `${profile.title} at ${profile.company}`
    });
    setIsProfileModalOpen(true);
  };

  const openCompanyModal = (company) => {
    setSelectedCompany({
      name: company.name,
      industry: company.industry || 'Technology',
      size: company.size || '50-100 employees',
      location: 'San Francisco, CA',
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
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-md shadow overflow-hidden`}>
      <ResultsTableHeader
        activeResultsTab={activeResultsTab}
        setActiveResultsTab={setActiveResultsTab}
        isDarkMode={isDarkMode}
        totalCount={totalData.length}
        netNewCount={netNewData.length}
        savedCount={savedData.length}
      />
      <ResultsTable
        results={getCurrentData()}
        openProfileModal={openProfileModal}
        openCompanyModal={openCompanyModal}
        handleSave={handleSave}
        isDarkMode={isDarkMode}
        activeTab={activeTab}
      />
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