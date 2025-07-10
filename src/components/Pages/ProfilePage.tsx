
import React from 'react';
import { Edit, ChevronDown } from 'lucide-react';

const ProfilePage = ({ isDarkMode }) => {
  const tasks = [
    { project: 'Email Credits', progress: 29.56, taskDone: '100%', time: '2 mins ago' },
    { project: 'Phone Credits', progress: 50, taskDone: '50%', time: '4 hrs ago' },
    { project: 'Buyer Intent Topic Credits', progress: 39, taskDone: '39%', time: 'a min ago' },
    { project: 'API Integration', progress: 78.03, taskDone: '78.03%', time: '2 weeks ago' },
    { project: 'Others', progress: 100, taskDone: '100%', time: '18 hrs ago' },
  ];

  const paymentHistory = [
    { month: 'March', type: 'Pro Membership', percentage: 90 },
    { month: 'February', type: 'Pro Membership', percentage: 90 },
    { month: 'January', type: 'Pro Membership', percentage: 90 },
  ];

  const cardDetails = [
    { type: 'American Express', expires: '12/2025', primary: false },
    { type: 'Mastercard', expires: '03/2025', primary: false },
    { type: 'Visa', expires: '10/2025', primary: true },
  ];

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Profile</h2>
            <Edit className="cursor-pointer" size={20} />
          </div>
          <img src="/api/placeholder/100/100" alt="Jimmy Turner" className="w-24 h-24 rounded-full mb-4" />
          <h3 className="text-lg font-semibold mb-2">Jimmy Turner</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>Web Developer</p>
          <div className="space-y-2">
            <p className="text-sm"><span className="font-medium">DOB:</span> Jan 20, 1989</p>
            <p className="text-sm"><span className="font-medium">Location:</span> New York, USA</p>
            <p className="text-sm"><span className="font-medium">Email:</span> jimmy@gmail.com</p>
            <p className="text-sm"><span className="font-medium">Phone:</span> +1 (530) 555-12121</p>
          </div>
          <div className="flex space-x-2 mt-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </div>
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
            <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14C2.7 0 1 1.7 1 3.8v16.4C1 22.3 2.7 24 4.8 24h14.4c2.1 0 3.8-1.7 3.8-3.8V3.8C22.8 1.7 21.1 0 19 0zm-11.6 20.4H4.3V9.3h3.1v11.1zm-1.5-12.7c-1 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7c1 0 1.7.8 1.7 1.7s-.7 1.7-1.7 1.7zm14.3 12.7h-3.1v-5.4c0-1.3-.5-2.2-1.7-2.2s-1.9.9-1.9 2.2v5.4h-3.1V9.3h3.1v1.5c.4-.7 1.5-1.8 3.1-1.8 2.2 0 3.7 1.5 3.7 4.6v7.3z"/>
              </svg>
            </div>
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.447 4.408c-.834.37-1.73.62-2.672.733a4.66 4.66 0 0 0 2.04-2.572 9.326 9.326 0 0 1-2.95 1.13 4.654 4.654 0 0 0-7.918 4.245 13.215 13.215 0 0 1-9.584-4.864A4.658 4.658 0 0 0 3.15 8.9a4.654 4.654 0 0 1-2.11-.58v.06a4.656 4.656 0 0 0 3.73 4.564 4.653 4.653 0 0 1-2.105.08 4.66 4.66 0 0 0 4.35 3.24A9.347 9.347 0 0 1 .776 18.24 13.191 13.191 0 0 0 7.22 20c8.93 0 13.814-7.4 13.814-13.814 0-.21-.004-.42-.014-.63a9.865 9.865 0 0 0 2.427-2.518z"/>
              </svg>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24H12.82v-9.294H9.692V11.41h3.128V8.797c0-3.1 1.894-4.788 4.66-4.788 1.324 0 2.462.098 2.794.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.296h-3.12V24h6.116C23.405 24 24 23.405 24 22.675V1.325C24 .595 23.405 0 22.675 0z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Task Section */}
        <div className={`md:col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <h2 className="text-xl font-bold mb-4">Credits Utilizations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left font-semibold">Product</th>
                  <th className="text-left font-semibold">Credits</th>
                  <th className="text-left font-semibold">Credit utilized</th>
                  <th className="text-left font-semibold">Last Used</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2">{task.project}</td>
                    <td className="py-2">
                      <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5`}>
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-2">{task.taskDone}</td>
                    <td className="py-2">{task.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

            {/* Pro Plan Section */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
              <h2 className="text-xl font-bold mb-4">Pro Plan</h2>
              <ul className="list-disc list-inside mb-4">
                <li>10,000 Monthly Visitors</li>
                <li>Unlimited Reports</li>
                <li>2 Years Data Storage</li>
              </ul>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">5 Days Left</span>
                <span className="text-sm font-bold">$25 / month</span>
              </div>
              <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5 mb-4`}>
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: '80%' }}
                ></div>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                Renew Now
              </button>
            </div>
    
            {/* Payment History Section */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
              <h2 className="text-xl font-bold mb-4">Payment History</h2>
              {paymentHistory.map((payment, index) => (
                <div key={index} className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-medium">{payment.month}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{payment.type}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">{payment.percentage}%</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
              ))}
            </div>
    
            {/* Card Details Section */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
              <h2 className="text-xl font-bold mb-4">Card Details</h2>
              {cardDetails.map((card, index) => (
                <div key={index} className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-6 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded mr-2`}></div>
                    <div>
                      <p className="font-medium">{card.type}</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Expires on {card.expires}</p>
                    </div>
                  </div>
                  {card.primary && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Primary</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
    
    export default ProfilePage;