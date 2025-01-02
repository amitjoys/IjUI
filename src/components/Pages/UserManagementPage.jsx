import React, { useState } from 'react';
import { Search, ChevronDown, MoreHorizontal, PlusCircle, UserPlus, UserMinus, UserCog } from 'lucide-react';

const UserManagementPage = ({ isDarkMode }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Yuna', email: 'yuna@twigma.com', lastEdit: '3 months ago', permissions: 'Can edit', role: 'Editor' },
    { id: 2, name: 'Whiskey', email: 'whiskey@twigma.com', lastEdit: '2 months ago', permissions: 'Owner', role: 'Editor' },
    { id: 3, name: 'Thea', email: 'thea@twigma.com', lastEdit: '3 weeks ago', permissions: 'Admin', role: 'Viewer - restricted' },
    { id: 4, name: 'Zen Pablo', email: 'zenpablo@twigmaa.com', lastEdit: '3 days ago', permissions: 'Can edit', role: 'Editor' },
    { id: 5, name: 'Iko', email: 'iko@twigma.com', lastEdit: '6 hours ago', permissions: 'Can edit files in 2 projects', role: 'Editor' },
    { id: 6, name: 'Murphie', email: 'murphie@twigma.com', lastEdit: '4 hours ago', permissions: 'Can edit 4 files', role: 'Editor' },
    { id: 7, name: 'Knives', email: 'knives@twigma.com', lastEdit: '1 week ago', permissions: 'Can view', role: 'Editor' },
    { id: 8, name: 'Hiro', email: 'hiro@twigma.com', lastEdit: '', permissions: 'No team permissions', role: 'Viewer - restricted' },
  ]);

  const [activeTab, setActiveTab] = useState('members');
  const [newMember, setNewMember] = useState({ name: '', email: '', role: '' });
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const addMember = () => {
    if (newMember.name && newMember.email && newMember.role) {
      setUsers([...users, { ...newMember, id: users.length + 1, lastEdit: '', permissions: 'No team permissions' }]);
      setNewMember({ name: '', email: '', role: '' });
      setShowAddMemberModal(false);
    }
  };

  const removeMember = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const updateRole = (id, newRole) => {
    setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'members':
        return (
          <div className={`overflow-x-auto ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg shadow`}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last edit</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Team permissions</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {users.map((user) => (
                  <tr key={user.id} className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
                          <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={isDarkMode ? 'text-gray-300' : 'text-gray-500'}>{user.lastEdit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={isDarkMode ? 'text-gray-300' : 'text-gray-500'}>{user.permissions}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-green-100 text-green-800'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <MoreHorizontal className="inline-block cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'roles':
        return (
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <span>{user.name}</span>
                <select
                  value={user.role}
                  onChange={(e) => updateRole(user.id, e.target.value)}
                  className={`ml-2 p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
                >
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            ))}
          </div>
        );
      case 'add':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="new-name" className="block mb-2">Name</label>
              <input
                id="new-name"
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
              />
            </div>
            <div>
              <label htmlFor="new-email" className="block mb-2">Email</label>
              <input
                id="new-email"
                value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
              />
            </div>
            <div>
              <label htmlFor="new-role" className="block mb-2">Role</label>
              <select
                id="new-role"
                value={newMember.role}
                onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
              >
                <option value="">Select a role</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button
              onClick={addMember}
              className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            >
              Add Member
            </button>
          </div>
        );
      case 'remove':
        return (
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <span>{user.name}</span>
                <button
                  onClick={() => removeMember(user.id)}
                  className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Members</h1>
        <button
          onClick={() => setShowAddMemberModal(true)}
          className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white flex items-center`}
        >
          <PlusCircle className="mr-2" size={20} />
          Invite
        </button>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <span>Last edit: All</span>
          <ChevronDown size={20} />
          <span>Team permissions: All</span>
          <ChevronDown size={20} />
          <span>Role: All</span>
          <ChevronDown size={20} />
        </div>
        <div className={`relative ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <input
            type="text"
            placeholder="Search users"
            className={`pl-10 pr-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
          />
          <Search className="absolute left-3 top-2" size={20} />
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setActiveTab('members')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'members' ? (isDarkMode ? 'bg-blue-600' : 'bg-blue-500') : (isDarkMode ? 'bg-gray-700' : 'bg-gray-200')} ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Members
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'roles' ? (isDarkMode ? 'bg-blue-600' : 'bg-blue-500') : (isDarkMode ? 'bg-gray-700' : 'bg-gray-200')} ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Roles
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'add' ? (isDarkMode ? 'bg-blue-600' : 'bg-blue-500') : (isDarkMode ? 'bg-gray-700' : 'bg-gray-200')} ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Add Member
        </button>
        <button
          onClick={() => setActiveTab('remove')}
          className={`px-4 py-2 rounded-md ${activeTab === 'remove' ? (isDarkMode ? 'bg-blue-600' : 'bg-blue-500') : (isDarkMode ? 'bg-gray-700' : 'bg-gray-200')} ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Remove Member
        </button>
      </div>

      {renderTabContent()}

      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-4">Add New Member</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="modal-new-name" className="block mb-2">Name</label>
                <input
                  id="modal-new-name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
                />
              </div>
              <div>
                <label htmlFor="modal-new-email" className="block mb-2">Email</label>
                <input
                  id="modal-new-email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
                />
              </div>
              <div>
                <label htmlFor="modal-new-role" className="block mb-2">Role</label>
                <select
                  id="modal-new-role"
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
                >
                  <option value="">Select a role</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddMemberModal(false)}
                  className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} text-gray-800`}
                >
                  Cancel
                </button>
                <button
                  onClick={addMember}
                  className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;