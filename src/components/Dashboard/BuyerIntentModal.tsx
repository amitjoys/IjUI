import React, { useState } from 'react';
import { X, ChevronRight, ChevronDown } from 'lucide-react';

const BuyerIntentModal = ({ isOpen, onClose, isDarkMode }) => {
  const [selectedTopics, setSelectedTopics] = useState([
    { name: 'Power Digital Marketing', count: 13 },
    { name: 'Digital Marketing Services', count: 3400 },
    { name: 'Automotive Digital Marketing', count: 1900 }
  ]);
  const [expandedTopics, setExpandedTopics] = useState({});

  const topics = [
    'Programming Languages',
    'Developers',
    'Development Software',
    'Controls & Standards',
    'Media & Advertising',
    'Business Services',
    'HR Services',
    'Technology',
    'Personal Computer',
    'Financial Software',
    'Others',
    'Software Engineering'
  ];

  const toggleTopic = (topic) => {
    setExpandedTopics(prev => ({ ...prev, [topic]: !prev[topic] }));
  };

  const handleTopicToggle = (topic) => {
    setSelectedTopics(prev =>
      prev.some(t => t.name === topic)
        ? prev.filter(t => t.name !== topic)
        : [...prev, { name: topic, count: Math.floor(Math.random() * 1000) }]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`w-11/12 max-w-4xl h-5/6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg overflow-hidden flex flex-col`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-xl font-bold">Intent Topic Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden flex">
          <div className="w-2/3 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Topics of Interest</h3>
            <p className="mb-4">Capture an intent signal if someone at a company engages with any of these topics:</p>
            <input
              type="text"
              placeholder="Search topic..."
              className={`w-full p-2 mb-4 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            />
            {topics.map(topic => (
              <div key={topic} className="mb-2">
                <div className="flex items-center cursor-pointer" onClick={() => toggleTopic(topic)}>
                  {expandedTopics[topic] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  <span className="ml-2">{topic}</span>
                </div>
                {expandedTopics[topic] && (
                  <div className="ml-6 mt-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={topic}
                        checked={selectedTopics.some(t => t.name === topic)}
                        onChange={() => handleTopicToggle(topic)}
                        className="mr-2"
                      />
                      <label htmlFor={topic}>{topic} Subtopic 1</label>
                    </div>
                    <div className="flex items-center mt-1">
                      <input
                        type="checkbox"
                        id={`${topic}-2`}
                        className="mr-2"
                      />
                      <label htmlFor={`${topic}-2`}>{topic} Subtopic 2</label>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="w-1/3 p-4 border-l border-gray-600 overflow-y-auto">
            <div className="mb-4">
              <span className="font-semibold">Selected ({selectedTopics.length}/3)</span>
              <span className="ml-4">Net new companies: 5.2K</span>
            </div>
            {selectedTopics.map(topic => (
              <div key={topic.name} className="bg-blue-500 text-white rounded-full px-3 py-1 mb-2 flex justify-between items-center">
                <span>{topic.name}</span>
                <span className="ml-2">{topic.count}</span>
                <button onClick={() => handleTopicToggle(topic.name)} className="ml-2 text-white hover:text-gray-200">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end p-4 border-t border-gray-600">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded mr-2">
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerIntentModal;