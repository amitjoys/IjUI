import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Info } from 'lucide-react';

const SequenceStepConfigModal = ({ isOpen, onClose, isDarkMode, step, onSave }) => {
  const [startTime, setStartTime] = useState('30');
  const [timeUnit, setTimeUnit] = useState('minutes');
  const [isImmediate, setIsImmediate] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priority, setPriority] = useState('medium');
  const [note, setNote] = useState('');
  const [limitEmails, setLimitEmails] = useState(false);
  const [emailLimit, setEmailLimit] = useState('');
  const [skipAfterDueDate, setSkipAfterDueDate] = useState(false);
  const [skipDays, setSkipDays] = useState('');

  if (!isOpen) return null;

  const modalClasses = `fixed inset-0 z-50 flex items-center justify-center p-4 ${
    isDarkMode ? 'bg-gray-900 bg-opacity-75' : 'bg-black bg-opacity-50'
  }`;

  const contentClasses = `w-full max-w-md rounded-lg ${
    isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
  }`;

  const headerClasses = `flex justify-between items-center p-4 border-b ${
    isDarkMode ? 'border-gray-700' : 'border-gray-200'
  }`;

  const bodyClasses = `p-4`;

  const inputClasses = `mt-1 block w-full rounded-md ${
    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
  } shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`;

  const buttonClasses = `px-4 py-2 rounded-md transition-colors`;

  const handleSave = () => {
    onSave({
      ...step,
      startTime: isImmediate ? 'immediate' : { time: startTime, unit: timeUnit },
      priority,
      note,
      limitEmails: limitEmails ? parseInt(emailLimit, 10) : null,
      skipAfterDueDate: skipAfterDueDate ? parseInt(skipDays, 10) : null,
    });
    onClose();
  };

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div className={headerClasses}>
          <h2 className="text-xl font-semibold">Select a sequence step</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className={bodyClasses}>
          <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 text-2xl">{step.icon}</div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
              <button className="text-blue-500 hover:underline">Change step</button>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">When to start this step:</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={isImmediate}
                  onChange={() => setIsImmediate(true)}
                  className="mr-2"
                />
                Immediately after the contact is added to sequence
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!isImmediate}
                  onChange={() => setIsImmediate(false)}
                  className="mr-2"
                />
                <input
                  type="number"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className={`${inputClasses} w-16 mr-2`}
                  disabled={isImmediate}
                />
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                  className={`${inputClasses} mr-2`}
                  disabled={isImmediate}
                >
                  <option value="minutes">minutes</option>
                  <option value="hours">hours</option>
                  <option value="days">days</option>
                </select>
                after the contact is added
              </label>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Assign task priority</h4>
            <div className="flex space-x-2">
              {['High', 'Medium', 'Low'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p.toLowerCase())}
                  className={`${buttonClasses} ${
                    priority === p.toLowerCase()
                      ? 'bg-blue-500 text-white'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {p} priority
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Add note</h4>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={`${inputClasses} h-24`}
              placeholder="Add a description, purpose or goal for the task"
            />
          </div>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-blue-500 hover:underline flex items-center"
          >
            {showAdvanced ? 'Hide' : 'Show'} advanced settings
            {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4">
              {step.type === 'manual_email' && (
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={limitEmails}
                      onChange={(e) => setLimitEmails(e.target.checked)}
                      className="mr-2"
                    />
                    Limit number of emails sent from this step per 24 hours
                    <Info size={16} className="ml-1 text-gray-500" />
                  </label>
                  {limitEmails && (
                    <input
                      type="number"
                      value={emailLimit}
                      onChange={(e) => setEmailLimit(e.target.value)}
                      className={`${inputClasses} mt-2 w-24`}
                      placeholder="emails"
                    />
                  )}
                </div>
              )}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={skipAfterDueDate}
                    onChange={(e) => setSkipAfterDueDate(e.target.checked)}
                    className="mr-2"
                  />
                  Automatically skip tasks after due date
                </label>
                {skipAfterDueDate && (
                  <div className="flex items-center mt-2">
                    <input
                      type="number"
                      value={skipDays}
                      onChange={(e) => setSkipDays(e.target.value)}
                      className={`${inputClasses} w-24 mr-2`}
                    />
                    <span>days after due date if task still incomplete.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={`flex justify-end p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={onClose}
            className={`${buttonClasses} mr-2 ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Back
          </button>
          <button
            onClick={handleSave}
            className={`${buttonClasses} bg-blue-500 text-white hover:bg-blue-600`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SequenceStepConfigModal;
