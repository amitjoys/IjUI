import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Linkedin, Facebook, Twitter, Eye, EyeOff } from 'lucide-react';

const ProfileModal = ({ isOpen, closeModal, profile, isDarkMode }) => {
  if (!profile) return null;

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} text-left align-middle shadow-xl transition-all`}>
                <ProfileHeader profile={profile} closeModal={closeModal} isDarkMode={isDarkMode} />
                <ProfileBody profile={profile} isDarkMode={isDarkMode} />
</Dialog.Panel>
</Transition.Child>
</div>
</div>
</Dialog>
</Transition>
);
};

const ProfileHeader = ({ profile, closeModal, isDarkMode }) => (
<div className={`relative ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4`}>
<button
onClick={closeModal}
className={`absolute top-2 right-2 ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'}`}
>
<X size={20} />
</button>
<div className="flex items-center">
<img
src="/api/placeholder/48/48"
alt="Profile"
className="w-12 h-12 rounded-full mr-4"
/>
<div>
<h3 className="text-xl font-bold">{profile.name}</h3>
<p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{profile.title}</p>
</div>
</div>
</div>
);

const ProfileBody = ({ profile, isDarkMode }) => (
<div className="p-4">
<CompanyInfo profile={profile} isDarkMode={isDarkMode} />
<ProfileDetails profile={profile} />
<ContactDetails profile={profile} isDarkMode={isDarkMode} />
<About profile={profile} />
<EmploymentHistory profile={profile} />
</div>
);

const CompanyInfo = ({ profile, isDarkMode }) => (
<div className="flex justify-between items-center mb-4">
<div>
<h4 className="font-semibold">{profile.company}</h4>
<p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
Website: {profile.website}
</p>
</div>
<div className="flex space-x-2">
<Linkedin className="text-blue-500" size={20} />
<Facebook className="text-blue-600" size={20} />
<Twitter className="text-blue-400" size={20} />
</div>
</div>
);

const ProfileDetails = ({ profile }) => (
<div className="space-y-2">
<p><span className="font-semibold">Location:</span> {profile.location}</p>
<p><span className="font-semibold">Industry:</span> {profile.industry}</p>
<p><span className="font-semibold">Employees:</span> {profile.employees}</p>
<p><span className="font-semibold">Revenue:</span> {profile.revenue}</p>
</div>
);

const ContactDetails = ({ profile, isDarkMode }) => {
const [showEmail, setShowEmail] = useState(false);
const [showPhone, setShowPhone] = useState(false);

const maskEmail = (email) => {
const [localPart, domain] = email.split('@');
return `${localPart.slice(0, 2)}xxxx@${domain.slice(0, 2)}xxxx.com`;
};

const maskPhone = (phone) => {
return `${phone.slice(0, 4)}xxxxx`;
};

return (
<div className="mt-4">
<h4 className="font-semibold mb-2">Contact Details</h4>
<div className="space-y-2">
<div className="flex items-center">
<p><span className="font-semibold">Email:</span> {showEmail ? profile.email : maskEmail(profile.email)}</p>
<button 
className={`ml-2 ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'}`}
onClick={() => setShowEmail(!showEmail)}
>
{showEmail ? <EyeOff size={16} /> : <Eye size={16} />}
</button>
</div>
<div className="flex items-center">
<p><span className="font-semibold">Phone:</span> {showPhone ? profile.phone : maskPhone(profile.phone)}</p>
<button 
className={`ml-2 ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'}`}
onClick={() => setShowPhone(!showPhone)}
>
{showPhone ? <EyeOff size={16} /> : <Eye size={16} />}
</button>
</div>
</div>
</div>
);
};

const About = ({ profile }) => (
<div className="mt-4">
<h4 className="font-semibold mb-2">About</h4>
<p className="text-sm">{profile.about}</p>
</div>
);

const EmploymentHistory = ({ profile }) => (
<div className="mt-4">
<h4 className="font-semibold mb-2">Employment History</h4>
<div className="flex items-center">
<div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
<p className="text-sm">
<span className="font-semibold">Current:</span> {profile.currentJob}
</p>
</div>
</div>
);

export default ProfileModal;