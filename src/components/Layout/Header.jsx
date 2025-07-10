// Updated Header.tsx
import React, { useState } from 'react';
import { Upload, Phone, Bell, Sun, Moon } from 'lucide-react';
import ProfileMenu from '../Dashboard/ProfileMenu';
import AnimatedSearchIcon from './AnimatedSearchIcon';
import SearchModal from './SearchModal';

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <header className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border-b border-gray-200 p-4 flex justify-between items-center`}>
      <div className="flex items-center">
        <input type="text" placeholder="Search InfoJoy" className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border rounded-md px-3 py-1 mr-4`} />
        <button className="bg-blue-500 text-white px-4 py-1 rounded-md">Upgrade</button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-blue-500">Import</button>
        <Upload size={20} className="cursor-pointer" />
        <Phone size={20} className="cursor-pointer" />
        <Bell size={20} className="cursor-pointer" />
        <AnimatedSearchIcon 
          onClick={() => setIsSearchModalOpen(true)} 
          isDarkMode={isDarkMode}
        />
        <button onClick={toggleDarkMode} className="p-1 rounded-full hover:bg-gray-200">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`w-8 h-8 ${isProfileMenuOpen ? 'bg-blue-500 text-white' : isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'} rounded-full flex items-center justify-center transition-colors duration-200`}
          >
            <span className="text-sm font-semibold">RS</span>
          </button>
          <ProfileMenu isOpen={isProfileMenuOpen} onClose={() => setIsProfileMenuOpen(false)} isDarkMode={isDarkMode} />
        </div>
      </div>
      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </header>
  );
};

export default Header;