import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, Plus, Search, MoreVertical, Shield, 
  Mail, Trash2, X, ChevronDown, Edit, 
  CheckCircle, XCircle 
} from 'lucide-react';

const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  MEMBER: 'Member'
};

const INITIAL_USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: ROLES.ADMIN,
    status: 'Active',
    credits: 1000,
    lastActive: '2024-03-28'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: ROLES.MANAGER,
    status: 'Active',
    credits: 500,
    lastActive: '2024-03-27'
  },
  {
    id: 3,
    name: 'John Doe',
    email: 'john@example.com',
    role: ROLES.ADMIN,
    status: 'Active',
    credits: 1000,
    lastActive: '2024-03-28'
  },
  {
    id: 4,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: ROLES.MANAGER,
    status: 'Active',
    credits: 500,
    lastActive: '2024-03-27'
  },
  {
    id: 5,
    name: 'John Doe',
    email: 'john@example.com',
    role: ROLES.ADMIN,
    status: 'Active',
    credits: 1000,
    lastActive: '2024-03-28'
  },
  {
    id: 6,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: ROLES.MANAGER,
    status: 'Active',
    credits: 500,
    lastActive: '2024-03-27'
  }
];

// Custom Modal Component with dark mode
const Modal = ({ isOpen, onClose, title, children, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg p-6 w-full max-w-md ${
        isDarkMode 
          ? 'bg-gray-800 text-white border border-gray-700' 
          : 'bg-white text-gray-900 border border-gray-200'
      }`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onClose} 
            className={`p-1 rounded hover:bg-opacity-10 ${
              isDarkMode ? 'hover:bg-gray-300' : 'hover:bg-gray-600'
            }`}
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Custom Dropdown Component with dark mode and click-outside closure
const Dropdown = ({ value, options, onChange, className, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-600 text-white hover:border-gray-500' 
            : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
        } ${isOpen ? 'border-blue-500' : ''} ${className || ''}`}
      >
        {value}
        <ChevronDown size={16} />
      </button>
      {isOpen && (
        <div className={`absolute z-10 w-full mt-1 border rounded-md shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-600 text-white' 
            : 'bg-white border-gray-300 text-gray-900'
        }`}>
          {options.map((option) => (
            <div
              key={option}
              className={`px-3 py-2 cursor-pointer ${
                isDarkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const UserManagement = ({ isDarkMode }) => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: ROLES.MEMBER,
    credits: 0
  });
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Input styles for reuse
  const inputClassName = `w-full px-3 py-2 rounded-md border ${
    isDarkMode 
      ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
  }`;

  const buttonClassName = "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors";

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    
    setUsers(prev => [...prev, {
      id: prev.length + 1,
      ...newUser,
      status: 'Pending',
      lastActive: '-'
    }]);
    
    setNewUser({
      name: '',
      email: '',
      role: ROLES.MEMBER,
      credits: 0
    });
    setShowAddModal(false);
  };

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setShowActionMenu(null);
  };

  const handleUpdateUserRole = (userId, newRole) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleUpdateUserCredits = (userId, credits) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, credits } : user
    ));
  };

  // Click-outside handler for action menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showActionMenu && !event.target.closest('.action-menu')) {
        setShowActionMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActionMenu]);

  return (
    <div className={`p-6 min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Team Management</h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Manage your team members and their permissions
        </p>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            className={`${inputClassName} pl-10`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={() => setShowAddModal(true)} className={buttonClassName}>
          <Plus size={20} />
          Add Team Member
        </button>
      </div>

      {/* Users Table */}
      <div className={`overflow-x-auto rounded-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>User</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Role</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Status</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Credits</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Last Active</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {filteredUsers.map((user) => (
              <tr key={user.id} className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium">{user.name}</div>
                      <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Dropdown
                    value={user.role}
                    options={Object.values(ROLES)}
                    onChange={(value) => handleUpdateUserRole(user.id, value)}
                    isDarkMode={isDarkMode}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    value={user.credits}
                    onChange={(e) => handleUpdateUserCredits(user.id, parseInt(e.target.value) || 0)}
                    className={`w-24 px-2 py-1 border rounded ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    }`}
                  />
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {user.lastActive}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative action-menu">
                    <button
                      onClick={() => setShowActionMenu(showActionMenu === user.id ? null : user.id)}
                      className={`p-1 rounded ${
                        isDarkMode 
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <MoreVertical size={20} />
                    </button>
                    {showActionMenu === user.id && (
                      <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${
                        isDarkMode 
                          ? 'bg-gray-800 border border-gray-700' 
                          : 'bg-white border border-gray-200'
                      }`}>
                        <div className="py-1">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className={`flex items-center w-full px-4 py-2 text-sm ${
                              isDarkMode 
                                ? 'text-red-400 hover:bg-gray-700' 
                                : 'text-red-600 hover:bg-gray-100'
                            }`}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Team Member"
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className={inputClassName}
            value={newUser.name}
            onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="email"
            placeholder="Email"
            className={inputClassName}
            value={newUser.email}
            onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
          />
          <Dropdown
            value={newUser.role}
            options={Object.values(ROLES)}
            onChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}
            isDarkMode={isDarkMode}
          />
          <input
            type="number"
            placeholder="Credits"
            className={inputClassName}
            value={newUser.credits}
            onChange={(e) => setNewUser(prev => ({ ...prev, credits: parseInt(e.target.value) || 0 }))}
          />          <button
          onClick={handleAddUser}
          className={`w-full ${buttonClassName}`}
        >
          Add Team Member
        </button>
      </div>
    </Modal>

    {/* Empty State */}
    {filteredUsers.length === 0 && (
      <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <Users className="mx-auto h-12 w-12 mb-4" />
        <h3 className="text-lg font-medium mb-2">No users found</h3>
        <p>Try adjusting your search or add a new team member.</p>
      </div>
    )}

    {/* Pagination (Optional) */}
    <div className={`mt-4 flex items-center justify-between ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
      <div className="flex items-center gap-2">
        <span>Showing {filteredUsers.length} users</span>
      </div>
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded-md ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
              : 'bg-white hover:bg-gray-50 border border-gray-300'
          }`}
        >
          Previous
        </button>
        <button
          className={`px-3 py-1 rounded-md ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
              : 'bg-white hover:bg-gray-50 border border-gray-300'
          }`}
        >
          Next
        </button>
      </div>
    </div>

    {/* Bulk Actions (Optional) */}
    <div className={`mt-4 p-4 rounded-lg border ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h3 className="font-medium">Bulk Actions</h3>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-md ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
            }`}
          >
            Export Users
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              isDarkMode 
                ? 'bg-red-900 hover:bg-red-800 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            Delete Selected
          </button>
        </div>
      </div>
    </div>

    {/* Toast/Notification Container (Optional) */}
    <div className="fixed bottom-4 right-4 space-y-2">
      {/* Success Toast Example */}
      <div className={`p-4 rounded-lg shadow-lg flex items-center gap-2 ${
        isDarkMode 
          ? 'bg-green-900 text-green-100' 
          : 'bg-green-100 text-green-800'
      }`}>
        <CheckCircle className="h-5 w-5" />
        <span>User successfully added!</span>
        <button 
          className={`ml-auto hover:opacity-75 ${
            isDarkMode ? 'text-green-200' : 'text-green-900'
          }`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  </div>
);
};

export default UserManagement;
