import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Upload, 
  CreditCard, 
  Settings, 
  BarChart3, 
  Puzzle,
  Home,
  Database,
  UserCheck,
  Crown
} from 'lucide-react';
import type { ComponentProps } from '../../types';

// Import admin sub-components
import AdminDashboard from './Admin/AdminDashboard';
import BulkUpload from './Admin/BulkUpload';
import UserManagement from './Admin/UserManagement';
import TeamManagement from './Admin/TeamManagement';
import PlanManagement from './Admin/PlanManagement';
import IntegrationManagement from './Admin/IntegrationManagement';

interface AdminPanelProps extends ComponentProps {}

const AdminPanel: React.FC<AdminPanelProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const adminMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      path: '/IJManage',
      description: 'Overview of application status'
    },
    {
      id: 'bulk-upload',
      label: 'Bulk Upload',
      icon: Upload,
      path: '/IJManage/bulk-upload',
      description: 'Upload CSV data in bulk'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      path: '/IJManage/users',
      description: 'Manage users, plans & billing'
    },
    {
      id: 'teams',
      label: 'Team Management',
      icon: UserCheck,
      path: '/IJManage/teams',
      description: 'Manage teams and members'
    },
    {
      id: 'plans',
      label: 'Plan Management',
      icon: Crown,
      path: '/IJManage/plans',
      description: 'Manage subscription plans'
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: Puzzle,
      path: '/IJManage/integrations',
      description: 'Manage API integrations'
    }
  ];

  const currentPath = location.pathname;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Admin Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-red-500" />
                <div>
                  <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    InfoJoy Admin
                  </h1>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Super Administration Panel
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Home size={18} />
              <span>Back to App</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`w-80 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} min-h-screen`}>
          <div className="p-6">
            <div className="space-y-2">
              {adminMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? isDarkMode
                          ? 'bg-blue-900 text-blue-200 border border-blue-700'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                        : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} className={isActive ? 'text-blue-500' : ''} />
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<AdminDashboard isDarkMode={isDarkMode} />} />
            <Route path="/bulk-upload" element={<BulkUpload isDarkMode={isDarkMode} />} />
            <Route path="/users" element={<UserManagement isDarkMode={isDarkMode} />} />
            <Route path="/teams" element={<TeamManagement isDarkMode={isDarkMode} />} />
            <Route path="/plans" element={<PlanManagement isDarkMode={isDarkMode} />} />
            <Route path="/integrations" element={<IntegrationManagement isDarkMode={isDarkMode} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;