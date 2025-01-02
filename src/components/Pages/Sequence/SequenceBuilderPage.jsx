
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import SequenceStepModal from './SequenceStepModal';
import SequenceStepConfigModal from './SequenceStepConfigModal';

const SequenceBuilderPage = ({ isDarkMode, sequences, addStep }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [sequence, setSequence] = useState(null);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  useEffect(() => {
    const foundSequence = sequences.find(seq => seq.id === id);
    if (foundSequence) {
      setSequence(foundSequence);
    } else {
      navigate('/error');
    }
  }, [id, sequences, navigate]);

  const tabs = ['Overview', 'Contacts', 'Activity', 'Report', 'Settings'];

  const handleAddStep = (step) => {
    setSelectedStep(step);
    setIsStepModalOpen(false);
    setIsConfigModalOpen(true);
  };

  const handleSaveConfiguredStep = (configuredStep) => {
    addStep(id, configuredStep);
    setIsConfigModalOpen(false);
  };

  const openStepModal = () => setIsStepModalOpen(true);
  const closeStepModal = () => setIsStepModalOpen(false);

  if (!sequence) return null;

  return (
    <div className={`container mx-auto px-4 py-8 ${isDarkMode ? 'text-white bg-gray-900' : 'text-gray-800 bg-white'}`}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <button onClick={() => navigate('/sequences')} className="mr-2 text-blue-500 hover:underline">
            Sequences
          </button>
          <span className="mr-2">&gt;</span>
          <h1 className="text-2xl font-bold">{sequence.name}</h1>
          <button className={`ml-2 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition-colors`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <select className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-300'} border`}>
            <option>Workflows</option>
          </select>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Add Contacts
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Launch
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : isDarkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <h2 className="text-xl font-semibold mb-4">Want to launch an effective sequence?</h2>
        <div className="h-2 w-1/3 bg-green-500 rounded mb-4"></div>
        <ul className="space-y-2">
          <li className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Create a sequence
          </li>
          <li className="flex items-center text-gray-500">
            <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-2"></div>
            Add steps to your sequence
          </li>
          <li className="flex items-center text-gray-500">
            <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-2"></div>
            Add leads to your sequence
          </li>
          <li className="flex items-center text-gray-500">
            <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-2"></div>
            Launch your sequence to begin outreach
          </li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Supercharge your workflow with sequences</h2>
        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Harness the power of Apollo AI to create multi-step sequences<br className="hidden md:inline" />
          that help you scale your outreach efforts, book more meetings,<br className="hidden md:inline" />
          and close more deals.
        </p>
        <button 
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => setIsStepModalOpen(true)}
        >
          Add a step
        </button>
      </div>

    <SequenceStepModal 
      isOpen={isStepModalOpen}
      onClose={() => setIsStepModalOpen(false)}
      isDarkMode={isDarkMode}
      onStepSelect={handleAddStep}
    />
    <SequenceStepConfigModal
      isOpen={isConfigModalOpen}
      onClose={() => setIsConfigModalOpen(false)}
      isDarkMode={isDarkMode}
      step={selectedStep}
      onSave={handleSaveConfiguredStep}
    />
    </div>
  );
};

export default SequenceBuilderPage;
