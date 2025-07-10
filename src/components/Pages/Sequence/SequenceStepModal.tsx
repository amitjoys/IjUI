import React from 'react';
import { X } from 'lucide-react';

const SequenceStepModal = ({ isOpen, onClose, isDarkMode, onStepSelect }) => {
  if (!isOpen) return null;

  const modalClasses = `fixed inset-0 z-50 flex items-center justify-center p-4 ${
    isDarkMode ? 'bg-gray-900 bg-opacity-75' : 'bg-black bg-opacity-50'
  }`;

  const contentClasses = `w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg ${
    isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
  }`;

  const headerClasses = `flex justify-between items-center p-6 border-b ${
    isDarkMode ? 'border-gray-700' : 'border-gray-200'
  }`;

  const closeButtonClasses = `text-gray-500 hover:text-gray-700 ${
    isDarkMode ? 'hover:text-gray-300' : ''
  }`;

  const sectionClasses = `p-6 border-b ${
    isDarkMode ? 'border-gray-700' : 'border-gray-200'
  }`;

  const stepItemClasses = `flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
    isDarkMode
      ? 'hover:bg-gray-700'
      : 'hover:bg-gray-100'
  }`;

  const stepTypes = [
    { type: 'Automatic', items: [{ icon: '📧', title: 'Automatic email', description: 'Emails are delivered automatically.', aiAvailable: true }] },
    { type: 'Tasks', items: [
      { icon: '📧', title: 'Manual email', description: 'Task is created to edit and deliver email.', aiAvailable: true },
      { icon: '📞', title: 'Phone call', description: 'Task is created to call prospect.' },
      { icon: '📝', title: 'Action item', description: 'Task is created to perform custom action.' }
    ]},
    { type: 'LinkedIn tasks', items: [
      { icon: 'in', title: 'LinkedIn - Send connection request', description: 'Send personalized invitations to connect with contacts for a positive first impression.' },
      { icon: 'in', title: 'LinkedIn - Send message', description: 'Send personalized direct messages to contacts you\'re connected with to build relationships.' },
      { icon: 'in', title: 'LinkedIn - View profile', description: 'View a contact\'s LinkedIn profile to gather key information for more effective engagement.' },
      { icon: 'in', title: 'LinkedIn - Interact with post', description: 'View a contact\'s activities and interact with their recent posts to foster engagement and boost visibility.' }
    ]}
  ];

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div className={headerClasses}>
          <h2 className="text-xl font-semibold">Select a sequence step</h2>
          <button onClick={onClose} className={closeButtonClasses}>
            <X size={24} />
          </button>
        </div>
        <div className={sectionClasses}>
          <p>Add a step for the sequence to follow and automate for you.</p>
        </div>
        {stepTypes.map((section, index) => (
          <div key={index} className={sectionClasses}>
            <h3 className="font-semibold mb-2">{section.type}</h3>
            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={stepItemClasses}
                onClick={() => onStepSelect(item)}
              >
                <div className="flex-shrink-0 mr-4">
                  {item.icon === 'in' ? (
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      in
                    </div>
                  ) : (
                    <span className="text-2xl">{item.icon}</span>
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                </div>
                {item.aiAvailable && (
                  <div className="flex-shrink-0 ml-4">
                    <span className="px-2 py-1 text-xs font-semibold text-purple-800 bg-purple-200 rounded-full">
                      AI available!
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SequenceStepModal;