import React, { useState } from 'react';
import { Upload, Phone, Bell, Sun, Moon, Search as SearchIcon } from 'lucide-react';
import ProfileMenu from '../Dashboard/ProfileMenu';
import AnimatedSearchIcon from './AnimatedSearchIcon';
import SearchModal from './SearchModal';
import type { ComponentProps } from '../../types';

interface HeaderProps extends ComponentProps {
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  return (
    <header className={`${
      isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'
    } border-b backdrop-blur-sm`}>
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Left Section - Search */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SearchIcon 
              size={20} 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} 
            />
            <input 
              type="text" 
              placeholder="Search InfoJoy" 
              className={`pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
            />
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
            Upgrade
          </button>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          <button className="text-blue-500 hover:text-blue-600 font-medium transition-colors">
            Import
          </button>
          
          <div className="flex items-center space-x-2">
            <button className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <Upload size={20} />
            </button>
            
            <button className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <Phone size={20} />
            </button>
            
            <button className={`p-2 rounded-lg transition-colors relative ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <AnimatedSearchIcon 
              onClick={() => setIsSearchModalOpen(true)} 
              isDarkMode={isDarkMode}
            />
            
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-all duration-200 ${
                isProfileMenuOpen 
                  ? 'bg-blue-500 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <span className="text-sm">RS</span>
            </button>
            <ProfileMenu 
              isOpen={isProfileMenuOpen} 
              onClose={() => setIsProfileMenuOpen(false)} 
              isDarkMode={isDarkMode} 
            />
          </div>
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