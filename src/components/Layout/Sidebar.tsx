import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Database, Send, Mail, Phone, Calendar, MessageSquare, DollarSign, CheckSquare, Zap, BarChart2, Settings, Menu, Users } from 'lucide-react';
import type { SidebarProps } from '../../types';

interface SidebarItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  path?: string;
  isActive?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  toggleSidebar, 
  isDarkMode, 
  showWebsiteFilters, 
  toggleWebsiteFilters 
}) => {
  const location = useLocation();
  
  const sidebarItems: SidebarItem[] = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/' },
    { icon: Database, label: 'Data enrichment', path: '/data' },
    { icon: Send, label: 'Sequences', path: '/sequences' },
    { icon: Mail, label: 'Emails', path: '/emails' },
    { icon: Phone, label: 'Calls', path: '/calls' },
    { icon: Calendar, label: 'Meetings', path: '/meetings' },
    { icon: MessageSquare, label: 'Conversations', path: '/conversations' },
    { icon: DollarSign, label: 'Deals', path: '/deals' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Zap, label: 'Workflows', path: '/workflows' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className={`h-screen transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    } ${
      isDarkMode 
        ? 'bg-gray-900 border-r border-gray-800' 
        : 'bg-white border-r border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center ${
              isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
            }`}>
              <span className="text-white font-bold text-sm">IJ</span>
            </div>
            <span className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              InfoJoy
            </span>
          </div>
        )}
        <button 
          onClick={toggleSidebar} 
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'hover:bg-gray-800 text-gray-300' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Menu size={20} />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {sidebarItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={label}
                to={path || '#'}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors group ${
                  isActive
                    ? isDarkMode 
                      ? 'bg-blue-900 text-blue-200' 
                      : 'bg-blue-50 text-blue-700'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`${isCollapsed ? 'mx-auto' : 'mr-3'} ${
                    isActive 
                      ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      : ''
                  }`} 
                />
                {!isCollapsed && (
                  <span className={`font-medium ${
                    isActive ? 'font-semibold' : ''
                  }`}>
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
