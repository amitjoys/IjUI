import React, { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, CreditCard, Package, Users, Linkedin, Settings, Book, LogOut } from 'lucide-react';

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const ProfileMenu = memo<ProfileMenuProps>(({ isOpen, onClose, isDarkMode }) => {
  const navigate = useNavigate();

  const menuItems = useMemo(() => [
    { icon: User, label: 'Your profile', action: () => navigate('/profile') },
    { icon: CreditCard, label: 'Billing', action: () => navigate('/billing') },
    { icon: Package, label: 'Upgrade plan' },
    { icon: Users, label: 'Your team', action: () => navigate('/team') },
    { icon: Linkedin, label: 'LinkedIn extension' },
    { icon: Settings, label: 'Integrations' },
    { icon: Book, label: 'Onboarding hub' },
    { icon: LogOut, label: 'Logout' },
  ], [navigate]);

  if (!isOpen) return null;

  return (
    <div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5 z-50`}>
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div className="px-4 py-2 text-sm border-b border-gray-200 dark:border-gray-700">
          <p className="font-medium">Ron Smith</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center px-4 py-2 text-sm text-left transition-fast ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            role="menuitem"
            onClick={() => {
              if (item.action) item.action();
              onClose();
            }}
          >
            <item.icon className="mr-3 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span className="flex-1">{item.label}</span>
            {item.label === 'Onboarding hub' && (
              <div className="ml-auto">
                <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">15%</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
});

ProfileMenu.displayName = 'ProfileMenu';

export default ProfileMenu;