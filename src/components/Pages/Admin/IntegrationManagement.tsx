import React, { useState } from 'react';
import { 
  Puzzle, 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Pause,
  Code,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';
import type { ComponentProps } from '../../../types';

interface IntegrationManagementProps extends ComponentProps {}

const IntegrationManagement: React.FC<IntegrationManagementProps> = ({ isDarkMode }) => {
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'curl' | 'tasks'>('overview');

  const integrations = [
    {
      id: 1,
      name: 'Salesforce CRM',
      type: 'CRM',
      description: 'Sync contacts and leads with Salesforce',
      status: 'active',
      users: 245,
      lastSync: '2024-07-11 10:30:00',
      endpoint: 'https://api.salesforce.com/v1/contacts',
      method: 'POST',
      authType: 'OAuth',
      curlCommand: `curl -X POST "https://api.salesforce.com/v1/contacts" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "company": "Example Corp"
  }'`,
      tasks: [
        { id: 1, title: 'Update API version to v2', status: 'pending', priority: 'high', assignee: 'dev-team' },
        { id: 2, title: 'Add bulk import feature', status: 'in-progress', priority: 'medium', assignee: 'john-dev' },
        { id: 3, title: 'Fix error handling', status: 'completed', priority: 'high', assignee: 'sarah-dev' }
      ]
    },
    {
      id: 2,
      name: 'HubSpot',
      type: 'Marketing',
      description: 'Integrate with HubSpot for marketing automation',
      status: 'active',
      users: 178,
      lastSync: '2024-07-11 09:15:00',
      endpoint: 'https://api.hubapi.com/crm/v3/objects/contacts',
      method: 'POST',
      authType: 'API Key',
      curlCommand: `curl -X POST "https://api.hubapi.com/crm/v3/objects/contacts" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "properties": {
      "email": "contact@example.com",
      "firstname": "Jane",
      "lastname": "Smith",
      "website": "example.com"
    }
  }'`,
      tasks: [
        { id: 4, title: 'Implement webhook support', status: 'pending', priority: 'medium', assignee: 'dev-team' },
        { id: 5, title: 'Add custom field mapping', status: 'in-progress', priority: 'low', assignee: 'mike-dev' }
      ]
    },
    {
      id: 3,
      name: 'Slack Notifications',
      type: 'Communication',
      description: 'Send notifications to Slack channels',
      status: 'maintenance',
      users: 89,
      lastSync: '2024-07-10 16:45:00',
      endpoint: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK',
      method: 'POST',
      authType: 'Webhook',
      curlCommand: `curl -X POST "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "New lead generated: John Doe from Example Corp",
    "channel": "#leads",
    "username": "InfoJoy Bot"
  }'`,
      tasks: [
        { id: 6, title: 'Update webhook URL', status: 'pending', priority: 'high', assignee: 'admin' },
        { id: 7, title: 'Add message templates', status: 'pending', priority: 'medium', assignee: 'design-team' }
      ]
    },
    {
      id: 4,
      name: 'Zapier',
      type: 'Automation',
      description: 'Connect with 1000+ apps via Zapier',
      status: 'inactive',
      users: 34,
      lastSync: '2024-07-08 12:20:00',
      endpoint: 'https://hooks.zapier.com/hooks/catch/YOUR_HOOK_ID',
      method: 'POST',
      authType: 'Webhook',
      curlCommand: `curl -X POST "https://hooks.zapier.com/hooks/catch/YOUR_HOOK_ID" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "action": "lead_created"
  }'`,
      tasks: [
        { id: 8, title: 'Reactivate integration', status: 'pending', priority: 'low', assignee: 'admin' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} />;
      case 'inactive': return <XCircle size={16} />;
      case 'maintenance': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Integration Management
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage API integrations and create new connections
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>New Integration</span>
        </button>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <div key={integration.id} className={`${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-xl border p-6 hover:shadow-lg transition-shadow`}>
            
            {/* Integration Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Puzzle className={`h-6 w-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {integration.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {integration.type}
                  </p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                {getStatusIcon(integration.status)}
                <span className="ml-1 capitalize">{integration.status}</span>
              </span>
            </div>

            {/* Integration Description */}
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {integration.description}
            </p>

            {/* Integration Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className={`${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              } rounded-lg p-3`}>
                <div className="flex items-center space-x-2">
                  <Users size={14} className="text-blue-500" />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {integration.users} Users
                  </span>
                </div>
              </div>
              <div className={`${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              } rounded-lg p-3`}>
                <div className="flex items-center space-x-2">
                  <Clock size={14} className="text-green-500" />
                  <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {integration.lastSync}
                  </span>
                </div>
              </div>
            </div>

            {/* Integration Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedIntegration(integration);
                  setShowIntegrationModal(true);
                }}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Settings size={14} />
                <span>Manage</span>
              </button>
              <div className="flex items-center space-x-2">
                <button className={`p-1.5 rounded-lg transition-colors ${
                  integration.status === 'active'
                    ? isDarkMode 
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-yellow-400' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-yellow-600'
                    : isDarkMode 
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-green-400' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-green-600'
                }`}>
                  {integration.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
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

      {/* Integration Detail Modal */}
      {showIntegrationModal && selectedIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Puzzle className={`h-6 w-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <div>
                  <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedIntegration.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedIntegration.type} Integration
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowIntegrationModal(false)}
                className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6">
              {[
                { id: 'overview', label: 'Overview', icon: Settings },
                { id: 'curl', label: 'cURL Commands', icon: Code },
                { id: 'tasks', label: 'Tasks', icon: CheckCircle }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === id
                      ? isDarkMode
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-50 text-blue-700'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Integration Info */}
                <div className="space-y-4">
                  <div className={`${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } rounded-lg p-4`}>
                    <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Integration Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Status
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIntegration.status)}`}>
                          {getStatusIcon(selectedIntegration.status)}
                          <span className="ml-1 capitalize">{selectedIntegration.status}</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Users
                        </span>
                        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {selectedIntegration.users}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Last Sync
                        </span>
                        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {selectedIntegration.lastSync}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Auth Type
                        </span>
                        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {selectedIntegration.authType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* API Endpoint */}
                  <div className={`${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } rounded-lg p-4`}>
                    <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      API Endpoint
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Method
                        </span>
                        <span className={`text-sm font-mono px-2 py-1 rounded ${
                          selectedIntegration.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {selectedIntegration.method}
                        </span>
                      </div>
                      <div>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          URL
                        </span>
                        <div className="flex items-center space-x-2 mt-1">
                          <code className={`flex-1 text-xs p-2 rounded ${
                            isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {selectedIntegration.endpoint}
                          </code>
                          <button
                            onClick={() => copyToClipboard(selectedIntegration.endpoint)}
                            className={`p-2 rounded-lg ${
                              isDarkMode 
                                ? 'hover:bg-gray-600 text-gray-400' 
                                : 'hover:bg-gray-200 text-gray-600'
                            }`}
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Configuration */}
                <div className="space-y-4">
                  <div className={`${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Configuration
                      </h4>
                      <button
                        onClick={() => setShowCredentials(!showCredentials)}
                        className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
                          isDarkMode 
                            ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {showCredentials ? <EyeOff size={14} /> : <Eye size={14} />}
                        <span>{showCredentials ? 'Hide' : 'Show'} Credentials</span>
                      </button>
                    </div>
                    {showCredentials && (
                      <div className="space-y-3">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            API Key
                          </label>
                          <input
                            type="password"
                            value="sk-1234567890abcdef"
                            className={`w-full px-3 py-2 rounded-lg border ${
                              isDarkMode 
                                ? 'bg-gray-800 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Webhook URL
                          </label>
                          <input
                            type="text"
                            value="https://api.infojoy.com/webhook/salesforce"
                            className={`w-full px-3 py-2 rounded-lg border ${
                              isDarkMode 
                                ? 'bg-gray-800 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className={`${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } rounded-lg p-4`}>
                    <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Quick Actions
                    </h4>
                    <div className="space-y-2">
                      <button className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}>
                        <Play size={14} />
                        <span>Test Connection</span>
                      </button>
                      <button className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}>
                        <Settings size={14} />
                        <span>Sync Now</span>
                      </button>
                      <button className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors text-red-600 hover:bg-red-50`}>
                        <Trash2 size={14} />
                        <span>Delete Integration</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'curl' && (
              <div className="space-y-6">
                <div className={`${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                } rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      cURL Command
                    </h4>
                    <button
                      onClick={() => copyToClipboard(selectedIntegration.curlCommand)}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
                        isDarkMode 
                          ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <Copy size={14} />
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className={`text-sm p-4 rounded-lg overflow-x-auto ${
                    isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedIntegration.curlCommand}
                  </pre>
                </div>

                <div className={`${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                } rounded-lg p-4`}>
                  <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Edit cURL Command
                  </h4>
                  <textarea
                    rows={12}
                    value={selectedIntegration.curlCommand}
                    className={`w-full px-3 py-2 rounded-lg border font-mono text-sm ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <div className="mt-3 flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Integration Tasks
                  </h4>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center space-x-2">
                    <Plus size={14} />
                    <span>Add Task</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {selectedIntegration.tasks.map((task: any) => (
                    <div key={task.id} className={`border rounded-lg p-4 ${
                      isDarkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-white'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {task.title}
                          </h5>
                          <div className="flex items-center space-x-3 mt-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              Assigned to: {task.assignee}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className={`p-1 rounded-lg transition-colors ${
                            isDarkMode 
                              ? 'hover:bg-gray-600 text-gray-400' 
                              : 'hover:bg-gray-200 text-gray-600'
                          }`}>
                            <Edit size={14} />
                          </button>
                          <button className={`p-1 rounded-lg transition-colors ${
                            isDarkMode 
                              ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
                              : 'hover:bg-gray-200 text-gray-600 hover:text-red-600'
                          }`}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Integration Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Create New Integration
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <XCircle size={20} />
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Integration Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter integration name"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Type
                  </label>
                  <select className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                    <option value="CRM">CRM</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Communication">Communication</option>
                    <option value="Automation">Automation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Description
                </label>
                <textarea
                  placeholder="Integration description"
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    API Endpoint
                  </label>
                  <input
                    type="url"
                    placeholder="https://api.example.com/v1/endpoint"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Method
                  </label>
                  <select className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                    <option value="POST">POST</option>
                    <option value="GET">GET</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  cURL Command
                </label>
                <textarea
                  placeholder="curl -X POST ..."
                  rows={6}
                  className={`w-full px-3 py-2 rounded-lg border font-mono text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className={`px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Integration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationManagement;