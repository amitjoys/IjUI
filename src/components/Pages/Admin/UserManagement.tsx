import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Edit, 
  Trash2, 
  Crown, 
  CreditCard,
  Calendar,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import type { ComponentProps } from '../../../types';

interface UserManagementProps extends ComponentProps {}

const UserManagement: React.FC<UserManagementProps> = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@company.com',
      phone: '+1-555-0123',
      location: 'New York, USA',
      plan: 'Pro',
      planStatus: 'active',
      credits: 1200,
      creditsUsed: 850,
      joinDate: '2024-01-15',
      lastActive: '2024-07-10',
      billingStatus: 'current',
      nextBilling: '2024-08-15',
      totalSpent: 2400
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@startup.com',
      phone: '+1-555-0124',
      location: 'San Francisco, USA',
      plan: 'Enterprise',
      planStatus: 'active',
      credits: 5000,
      creditsUsed: 3200,
      joinDate: '2024-02-20',
      lastActive: '2024-07-11',
      billingStatus: 'current',
      nextBilling: '2024-08-20',
      totalSpent: 8900
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@enterprise.com',
      phone: '+1-555-0125',
      location: 'Chicago, USA',
      plan: 'Basic',
      planStatus: 'cancelled',
      credits: 500,
      creditsUsed: 450,
      joinDate: '2024-03-10',
      lastActive: '2024-07-05',
      billingStatus: 'overdue',
      nextBilling: '2024-07-10',
      totalSpent: 450
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || user.planStatus === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Basic': return 'bg-gray-100 text-gray-800';
      case 'Pro': return 'bg-blue-100 text-blue-800';
      case 'Enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBillingStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-green-600';
      case 'overdue': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          User Management
        </h1>
        <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage users, their plans, and billing information
        </p>
      </div>

      {/* Filters and Search */}
      <div className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } rounded-xl border p-6`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'cancelled', 'suspended'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } rounded-xl border overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  User
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Plan
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Credits
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Status
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Billing
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b hover:${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user.name}
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(user.plan)}`}>
                      <Crown size={12} className="mr-1" />
                      {user.plan}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {user.creditsUsed.toLocaleString()} / {user.credits.toLocaleString()}
                    </div>
                    <div className={`w-20 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-1.5 mt-1`}>
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${(user.creditsUsed / user.credits) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.planStatus)}`}>
                      {user.planStatus === 'active' ? <CheckCircle size={12} className="mr-1" /> :
                       user.planStatus === 'cancelled' ? <XCircle size={12} className="mr-1" /> :
                       <AlertCircle size={12} className="mr-1" />}
                      {user.planStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`text-sm ${getBillingStatusColor(user.billingStatus)}`}>
                      ${user.totalSpent.toLocaleString()}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Next: {user.nextBilling}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode 
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Edit size={16} />
                      </button>
                      <button className={`p-2 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400' 
                          : 'hover:bg-gray-100 text-gray-500 hover:text-red-600'
                      }`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                User Details
              </h3>
              <button
                onClick={() => setShowUserModal(false)}
                className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Users size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedUser.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedUser.email}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedUser.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedUser.location}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Crown size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedUser.plan} Plan
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    ${selectedUser.totalSpent.toLocaleString()} total spent
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Joined {selectedUser.joinDate}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowUserModal(false)}
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;