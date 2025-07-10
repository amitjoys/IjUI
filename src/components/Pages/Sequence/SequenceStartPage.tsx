
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewSequenceModal from './NewSequenceModal';

const SequenceStartPage = ({ isDarkMode, sequences, addSequence }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddSequence = (newSequence) => {
    addSequence(newSequence);
    closeModal();
    navigate(`/sequences/main/${newSequence.id}`);
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      <h1 className="text-3xl font-bold mb-6">Create your first sequence</h1>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
        Build custom campaigns to automate emails, set more meetings, and convert more customers.
      </p>
      
      <div className="space-y-4 mb-8">
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
          </svg>
          Create a sequence with AI
        </button>
        <button 
          onClick={openModal}
          className={`flex items-center px-4 py-2 border rounded transition-colors ${isDarkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create sequence
        </button>
      </div>

      {sequences.length > 0 && (
        <div className={`mb-8 p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Your Sequences</h2>
          <ul className="space-y-2">
            {sequences.map((sequence) => (
              <li 
                key={sequence.id} 
                className={`p-2 rounded cursor-pointer transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => navigate(`/sequences/main/${sequence.id}`)}
              >
                {sequence.name}
              </li>
            ))}
          </ul>
        </div>
      )}


      <div className="space-y-6">
        <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Connect Salesloft or Outreach</h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            Already have Outreach or Salesloft? Integrate them with Apollo to seamlessly manage communications in one place.
          </p>
          <div className="space-x-4">
            <button className={`px-4 py-2 border rounded ${isDarkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>Connect Salesloft</button>
            <button className={`px-4 py-2 border rounded ${isDarkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>Connect Outreach</button>
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Pre-built Templates</h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            You don't have to start from scratch! Use our pre-built sequences as a base, then customize to your heart's content.
          </p>
          <button className={`px-4 py-2 border rounded ${isDarkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>Create sequence</button>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Guide to sequences</h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            Discover how sequences can help optimize and automate engagement with your contacts.
          </p>
          <button className={`px-4 py-2 border rounded ${isDarkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>Learn more</button>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">More sequence resources</h2>
          {/* Add more sequence resources content here */}
        </div>
      </div>
      <NewSequenceModal isOpen={isModalOpen} onClose={closeModal} isDarkMode={isDarkMode} addSequence={handleAddSequence} />
    </div>
  );
};

export default SequenceStartPage;
