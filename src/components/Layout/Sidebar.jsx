import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Database, Send, Mail, Phone, Calendar, MessageSquare, DollarSign, CheckSquare, Zap, BarChart2, Settings, Menu } from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar, isDarkMode }) => {
  const sidebarItems = [
    { icon: Home, label: 'Home' },
    { icon: Search, label: 'Search' },
    { icon: Database, label: 'Data enrichment' },
    { icon: Send, label: 'Sequences', path: '/sequences' },
    { icon: Mail, label: 'Emails' },
    { icon: Phone, label: 'Calls' },
    { icon: Calendar, label: 'Meetings' },
    { icon: MessageSquare, label: 'Conversations' },
    { icon: DollarSign, label: 'Deals' },
    { icon: CheckSquare, label: 'Tasks' },
    { icon: Zap, label: 'Workflows' },
    { icon: BarChart2, label: 'Analytics' },
    { icon: Settings, label: 'Settings' ,path: '/analytics'},
  ];

  return (
    <div className={`h-screen p-4 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="flex items-center mb-8 justify-between">
        {!isCollapsed && <div className={`w-8 h-8 rounded-md mr-2 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>}
        {!isCollapsed && <span className="text-xl font-bold">InfoJoy</span>}
        <button onClick={toggleSidebar} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
          <Menu size={20} />
        </button>
      </div>
      <nav>
        {sidebarItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className={`flex items-center mb-4 cursor-pointer ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-500'}`}
          >
            <Icon size={20} className="mr-2" />
            {!isCollapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
