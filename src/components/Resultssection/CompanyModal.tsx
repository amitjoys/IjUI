import React from 'react';
import { Dialog } from '@headlessui/react';

const CompanyModal = ({ isOpen, closeModal, company, isDarkMode }) => {
  if (!company) return null;
  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`w-full max-w-sm rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-6`}>
          <h3 className="text-lg font-medium leading-6 mb-4">{company.name}</h3>
          <CompanyDetails company={company} />
          <CloseButton closeModal={closeModal} isDarkMode={isDarkMode} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

const CompanyDetails = ({ company }) => (
  <>
    <p><strong>Industry:</strong> {company.industry}</p>
    <p><strong>Size:</strong> {company.size}</p>
    <p><strong>Location:</strong> {company.location}</p>
    <p><strong>Founded:</strong> {company.founded}</p>
    <p><strong>Website:</strong> {company.website}</p>
    <p><strong>LinkedIn:</strong> {company.linkedin}</p>
  </>
);

const CloseButton = ({ closeModal, isDarkMode }) => (
  <button
    onClick={closeModal}
    className={`mt-4 inline-flex justify-center rounded-md border border-transparent ${
      isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
    } px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
  >
    Close
  </button>
);

export default CompanyModal;