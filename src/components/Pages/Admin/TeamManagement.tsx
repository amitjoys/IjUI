import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  UserPlus, 
  UserMinus,
  Crown,
  Building,
  Calendar,
  Mail,
  Shield
} from 'lucide-react';
import type { ComponentProps } from '../../../types';

interface TeamManagementProps extends ComponentProps {}

const TeamManagement: React.FC<TeamManagementProps> = ({ isDarkMode }) => {
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const teams = [
    {
      id: 1,
      name: 'Sales Team Alpha',
      company: 'Tech Corp',
      owner: 'john@company.com',
      members: [
        { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'Member', status: 'active' },
        { id: 3, name: 'Bob Wilson', email: 'bob@company.com', role: 'Member', status: 'pending' }
      ],
      plan: 'Enterprise',
      created: '2024-01-15',
      creditsUsed: 2500,
      creditsTotal: 5000,
      status: 'active'
    },
    {
      id: 2,
      name: 'Marketing Outreach',
      company: 'StartupCo',
      owner: 'sarah@startup.com',
      members: [
        { id: 4, name: 'Sarah Johnson', email: 'sarah@startup.com', role: 'Admin', status: 'active' },
        { id: 5, name: 'Mike Chen', email: 'mike@startup.com', role: 'Member', status: 'active' }
      ],
      plan: 'Pro',
      created: '2024-02-20',
      creditsUsed: 800,
      creditsTotal: 2000,
      status: 'active'
    },
    {
      id: 3,
      name: 'Development Team',
      company: 'Enterprise Inc',
      owner: 'dev@enterprise.com',
      members: [
        { id: 6, name: 'Alex Rodriguez', email: 'alex@enterprise.com', role: 'Admin', status: 'active' },
        { id: 7, name: 'Lisa Park', email: 'lisa@enterprise.com', role: 'Member', status: 'inactive' }
      ],
      plan: 'Basic',
      created: '2024-03-10',
      creditsUsed: 450,
      creditsTotal: 500,
      status: 'suspended'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Basic': return 'bg-gray-100 text-gray-800';
      case 'Pro': return 'bg-blue-100 text-blue-800';
      case 'Enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Member': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Team Management
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage teams and their members
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus size={16} />
          <span>Add Team</span>
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className={`${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-xl border p-6 hover:shadow-lg transition-shadow`}>
            
            {/* Team Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Users className={`h-6 w-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {team.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {team.company}
                  </p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(team.status)}`}>
                {team.status}
              </span>
            </div>

            {/* Team Stats */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Members
                </span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {team.members.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Plan
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(team.plan)}`}>
                  <Crown size={10} className="mr-1" />
                  {team.plan}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Credits Used
                </span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {team.creditsUsed.toLocaleString()} / {team.creditsTotal.toLocaleString()}
                </span>
              </div>
              <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(team.creditsUsed / team.creditsTotal) * 100}%` }}
                />
              </div>
            </div>

            {/* Team Members Preview */}
            <div className="mb-4">
              <div className="flex -space-x-2">
                {team.members.slice(0, 4).map((member, index) => (
                  <div
                    key={member.id}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm border-2 ${
                      isDarkMode 
                        ? 'bg-gray-700 text-white border-gray-800' 
                        : 'bg-gray-100 text-gray-800 border-white'
                    }`}
                    title={member.name}
                  >
                    {member.name.charAt(0)}
                  </div>
                ))}
                {team.members.length > 4 && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm border-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white border-gray-800' 
                      : 'bg-gray-100 text-gray-800 border-white'
                  }`}>
                    +{team.members.length - 4}
                  </div>
                )}
              </div>
            </div>

            {/* Team Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedTeam(team);
                  setShowTeamModal(true);
                }}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Edit size={14} />
                <span>Manage</span>
              </button>
              <div className="flex items-center space-x-2">
                <button className={`p-1.5 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-green-400' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-green-600'
                }`}>
                  <UserPlus size={14} />
                </button>
                <button className={`p-1.5 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-red-600'
                }`}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Detail Modal */}
      {showTeamModal && selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Building className={`h-6 w-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <div>
                  <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedTeam.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedTeam.company}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTeamModal(false)}
                className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Team Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className={`${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              } rounded-lg p-4`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Crown size={16} className="text-blue-500" />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Plan
                  </span>
                </div>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedTeam.plan}
                </p>
              </div>
              <div className={`${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              } rounded-lg p-4`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Users size={16} className="text-green-500" />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Members
                  </span>
                </div>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedTeam.members.length}
                </p>
              </div>
              <div className={`${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              } rounded-lg p-4`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar size={16} className="text-purple-500" />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Created
                  </span>
                </div>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedTeam.created}
                </p>
              </div>
            </div>

            {/* Team Members */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Team Members
                </h4>
                <button 
                  onClick={() => setShowAddUserModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center space-x-2 text-sm"
                >
                  <UserPlus size={14} />
                  <span>Add Member</span>
                </button>
              </div>
              <div className="space-y-3">
                {selectedTeam.members.map((member: any) => (
                  <div key={member.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                    isDarkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {member.name}
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {member.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                        {member.role === 'Admin' && <Shield size={10} className="mr-1" />}
                        {member.role}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                      <button className={`p-1 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
                          : 'hover:bg-gray-200 text-gray-500 hover:text-red-600'
                      }`}>
                        <UserMinus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowTeamModal(false)}
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

export default TeamManagement;