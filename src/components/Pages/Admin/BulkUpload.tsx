import React, { useState } from 'react';
import { 
  Upload, 
  Download, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Database,
  Users,
  Building
} from 'lucide-react';
import type { ComponentProps } from '../../../types';

interface BulkUploadProps extends ComponentProps {}

const BulkUpload: React.FC<BulkUploadProps> = ({ isDarkMode }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'completed' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<'contacts' | 'companies' | 'sequences'>('contacts');

  const uploadHistory = [
    {
      id: 1,
      filename: 'contacts_batch_1.csv',
      type: 'Contacts',
      records: 1250,
      status: 'completed',
      uploadedBy: 'admin@infojoy.com',
      uploadedAt: '2024-07-10 14:30:00',
      errors: 0
    },
    {
      id: 2,
      filename: 'companies_data.csv',
      type: 'Companies',
      records: 850,
      status: 'completed',
      uploadedBy: 'admin@infojoy.com',
      uploadedAt: '2024-07-10 12:15:00',
      errors: 5
    },
    {
      id: 3,
      filename: 'sequences_batch.csv',
      type: 'Sequences',
      records: 45,
      status: 'failed',
      uploadedBy: 'admin@infojoy.com',
      uploadedAt: '2024-07-10 10:45:00',
      errors: 12
    }
  ];

  const sampleData = {
    contacts: [
      'Name,Email,Phone,Title,Company,Location',
      'John Doe,john@company.com,+1-555-0123,CEO,Tech Corp,New York',
      'Jane Smith,jane@startup.com,+1-555-0124,CTO,StartupCo,San Francisco',
      'Bob Johnson,bob@enterprise.com,+1-555-0125,VP Sales,Enterprise Inc,Chicago'
    ],
    companies: [
      'Name,Industry,Size,Location,Website,Founded',
      'Tech Corp,Technology,1000-5000,New York,https://techcorp.com,2010',
      'StartupCo,Software,50-200,San Francisco,https://startupco.com,2018',
      'Enterprise Inc,Manufacturing,5000+,Chicago,https://enterprise.com,1995'
    ],
    sequences: [
      'Name,Description,Type,Steps,Status',
      'Cold Email Sequence,Initial outreach sequence,Email,5,Active',
      'LinkedIn Outreach,LinkedIn connection sequence,LinkedIn,3,Active',
      'Follow-up Sequence,Follow-up after initial contact,Email,4,Draft'
    ]
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('idle');
      setUploadProgress(0);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('completed');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const downloadSample = () => {
    const data = sampleData[activeTab];
    const csvContent = data.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sample_${activeTab}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Bulk Data Upload
        </h1>
        <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Upload CSV files to import data in bulk
        </p>
      </div>

      {/* Upload Section */}
      <div className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } rounded-xl border p-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Upload New Data
        </h3>

        {/* Data Type Tabs */}
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'contacts', label: 'Contacts', icon: Users },
            { id: 'companies', label: 'Companies', icon: Building },
            { id: 'sequences', label: 'Sequences', icon: Database }
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

        {/* Sample Download */}
        <div className="mb-6">
          <button
            onClick={downloadSample}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode
                ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                : 'border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            <Download size={16} />
            <span>Download Sample {activeTab} CSV</span>
          </button>
        </div>

        {/* File Upload */}
        <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDarkMode ? 'border-gray-600' : 'border-gray-300'
        }`}>
          <div className="space-y-4">
            <div className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <Upload className={`h-6 w-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            
            <div>
              <h4 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Upload CSV File
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Select a CSV file to upload {activeTab} data
              </p>
            </div>

            <div>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer`}
              >
                Select File
              </label>
            </div>

            {selectedFile && (
              <div className="mt-4">
                <div className={`flex items-center justify-center space-x-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <FileText size={16} />
                  <span className="text-sm">{selectedFile.name}</span>
                </div>
                
                {uploadStatus === 'uploading' && (
                  <div className="mt-4">
                    <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}

                {uploadStatus === 'completed' && (
                  <div className="mt-4 flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-sm">Upload completed successfully!</span>
                  </div>
                )}

                {uploadStatus === 'error' && (
                  <div className="mt-4 flex items-center justify-center space-x-2 text-red-600">
                    <AlertCircle size={16} />
                    <span className="text-sm">Upload failed. Please try again.</span>
                  </div>
                )}

                {uploadStatus === 'idle' && (
                  <button
                    onClick={handleUpload}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Upload File
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload History */}
      <div className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } rounded-xl border p-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Upload History
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  File
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Type
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Records
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Status
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Uploaded By
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {uploadHistory.map((record) => (
                <tr key={record.id} className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                  <td className={`py-3 px-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <div className="flex items-center space-x-2">
                      <FileText size={16} />
                      <span className="text-sm">{record.filename}</span>
                    </div>
                  </td>
                  <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {record.type}
                  </td>
                  <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {record.records.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'completed' ? 'bg-green-100 text-green-800' :
                      record.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status === 'completed' ? <CheckCircle size={12} /> :
                       record.status === 'failed' ? <AlertCircle size={12} /> :
                       <Clock size={12} />}
                      <span className="capitalize">{record.status}</span>
                    </span>
                  </td>
                  <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {record.uploadedBy}
                  </td>
                  <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {record.uploadedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;