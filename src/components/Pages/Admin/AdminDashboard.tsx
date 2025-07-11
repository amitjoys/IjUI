import React from 'react';
import { 
  Users, 
  Database, 
  Activity, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  Zap
} from 'lucide-react';
import type { ComponentProps } from '../../../types';

interface AdminDashboardProps extends ComponentProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isDarkMode }) => {
  const statsCards = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '8,421',
      change: '+8.2%',
      changeType: 'positive',
      icon: Activity,
      color: 'green'
    },
    {
      title: 'Revenue',
      value: '$45,210',
      change: '+15.3%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: 'Database Size',
      value: '2.4TB',
      change: '+5.1%',
      changeType: 'neutral',
      icon: Database,
      color: 'purple'
    }
  ];

  const systemStatus = [
    {
      service: 'Database',
      status: 'healthy',
      uptime: '99.9%',
      lastCheck: '2 mins ago'
    },
    {
      service: 'API Server',
      status: 'healthy',
      uptime: '99.8%',
      lastCheck: '1 min ago'
    },
    {
      service: 'Search Engine',
      status: 'warning',
      uptime: '98.5%',
      lastCheck: '5 mins ago'
    },
    {
      service: 'Email Service',
      status: 'healthy',
      uptime: '99.7%',
      lastCheck: '3 mins ago'
    }
  ];

  const recentActivity = [
    {
      action: 'Bulk data upload',
      user: 'admin@infojoy.com',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      action: 'User plan upgrade',
      user: 'john.doe@company.com',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      action: 'Integration update',
      user: 'system',
      time: '6 hours ago',
      status: 'failed'
    },
    {
      action: 'Team creation',
      user: 'sarah.wilson@startup.com',
      time: '8 hours ago',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Admin Dashboard
        </h1>
        <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Monitor and manage your InfoJoy application
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-xl border p-6`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl border p-6`}>
          <div className="flex items-center space-x-2 mb-4">
            <Server className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              System Status
            </h3>
          </div>
          <div className="space-y-4">
            {systemStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'healthy' ? 'bg-green-500' :
                    service.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {service.service}
                  </span>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    service.status === 'healthy' ? 'text-green-600' :
                    service.status === 'warning' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {service.uptime}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {service.lastCheck}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl border p-6`}>
          <div className="flex items-center space-x-2 mb-4">
            <Activity className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                    activity.status === 'failed' ? 'bg-red-100 text-red-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {activity.status === 'completed' ? <CheckCircle size={16} /> :
                     activity.status === 'failed' ? <AlertTriangle size={16} /> :
                     <Clock size={16} />}
                  </div>
                  <div>
                    <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {activity.action}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {activity.user}
                    </div>
                  </div>
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } rounded-xl border p-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors ${
            isDarkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}>
            <Zap className="h-5 w-5 text-blue-500" />
            <div className="text-left">
              <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Run System Check
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Check all services
              </div>
            </div>
          </button>
          <button className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors ${
            isDarkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}>
            <Database className="h-5 w-5 text-green-500" />
            <div className="text-left">
              <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Backup Database
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Create backup
              </div>
            </div>
          </button>
          <button className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors ${
            isDarkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}>
            <TrendingUp className="h-5 w-5 text-purple-500" />
            <div className="text-left">
              <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Generate Report
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Monthly analytics
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;