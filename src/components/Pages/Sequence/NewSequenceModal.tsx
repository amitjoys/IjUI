import React, { useState } from 'react';

const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

const NewSequenceModal = ({ isOpen, onClose, isDarkMode, addSequence }) => {
  const [sequenceName, setSequenceName] = useState('');
  const [permissions, setPermissions] = useState('Team can view and use');
  const [schedule, setSchedule] = useState('Normal Business Hours');

  if (!isOpen) return null;

  const modalClass = `fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 ${isDarkMode ? 'dark' : ''}`;
  const contentClass = `relative p-6 border w-full max-w-md shadow-lg rounded-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`;

  const handleCreate = () => {
    if (sequenceName.trim()) {
      const newSequence = {
        id: generateUniqueId(),
        name: sequenceName,
        permissions,
        schedule
      };
      addSequence(newSequence);
      setSequenceName('');
      setPermissions('Team can view and use');
      setSchedule('Normal Business Hours');
      onClose();
    }
  };

  return (
    <div className={modalClass}>
      <div className={contentClass}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">New Sequence</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Customize this sequence's name, permission settings, sending schedule, and more.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="sequenceName">Sequence Name</label>
            <input
              type="text"
              id="sequenceName"
              value={sequenceName}
              onChange={(e) => setSequenceName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="permissions">Permissions</label>
            <select
              id="permissions"
              value={permissions}
              onChange={(e) => setPermissions(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
            >
              <option>Team can view and use</option>
              <option>Only I can view and use</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="schedule">Schedule</label>
            <select
              id="schedule"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
            >
              <option>Normal Business Hours</option>
              <option>Custom Schedule</option>
            </select>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              You may edit or create new schedules <a href="#" className="text-blue-500 hover:underline">here</a>
            </p>
          </div>
          <div className={`p-3 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h4 className="font-medium mb-2">Normal Business Hours</h4>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
              <p key={day} className="text-sm">
                <span className="font-medium">{day}:</span> 8 AM – 5 PM
              </p>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button 
            onClick={onClose} 
            className={`px-4 py-2 rounded-md transition-colors ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            Back
          </button>
          <button 
            onClick={handleCreate}
            disabled={!sequenceName.trim()}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md transition-colors ${sequenceName.trim() ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'}`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSequenceModal;
