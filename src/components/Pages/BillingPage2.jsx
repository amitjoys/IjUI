import React from 'react';
import { CreditCard, MapPin, Edit2, ChevronDown } from 'lucide-react';

const BillingPage2 = ({ isDarkMode }) => {
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`p-6 ${bgColor} ${textColor} min-h-screen`}>
      <h1 className="text-2xl font-bold mb-6">Billing details</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className={`${cardBgColor} rounded-lg shadow p-6`}>
            <h2 className="text-xl font-semibold mb-4">Current subscription plan</h2>
            <div className={`flex items-center justify-between ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg p-4`}>
              <div>
                <p className="text-2xl font-bold text-blue-600">$25.00</p>
                <p className="text-sm text-blue-600">Company Plus</p>
              </div>
              <button className="px-4 py-2 rounded bg-white text-blue-600 hover:bg-gray-100">
                Change Plan
              </button>
            </div>
          </div>
          <div className={`${cardBgColor} rounded-lg shadow p-6`}>
            <h2 className="text-xl font-semibold mb-4">Next payment</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">$50.00</p>
                <p className="text-sm text-gray-500">on May 15, 2020</p>
              </div>
              <button className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'} text-white`}>
                Manage Payments
              </button>
            </div>
          </div>
          <div className={`${cardBgColor} rounded-lg shadow p-6`}>
            <h2 className="text-xl font-semibold mb-4">Payment history</h2>
            <table className="w-full">
              <thead>
                <tr className={`border-b ${borderColor}`}>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Recipient</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Payment method</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b ${borderColor}`}>
                  <td className="py-2">$65.00</td>
                  <td className="py-2"><span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span></td>
                  <td className="py-2 flex items-center">
                    <img src="/api/placeholder/24/24" alt="Gabriel Banks" className="w-6 h-6 rounded-full mr-2" />
                    Gabriel Banks
                  </td>
                  <td className="py-2">May 10, 2020</td>
                  <td className="py-2 flex items-center justify-between">
                    Visa 5432
                    <ChevronDown size={16} />
                  </td>
                </tr>
                <tr className={`border-b ${borderColor}`}>
                  <td className="py-2">$250.00</td>
                  <td className="py-2"><span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span></td>
                  <td className="py-2 flex items-center">
                    <img src="/api/placeholder/24/24" alt="Claudia Welch" className="w-6 h-6 rounded-full mr-2" />
                    Claudia Welch
                  </td>
                  <td className="py-2">Apr 10, 2020</td>
                  <td className="py-2 flex items-center justify-between">
                    Visa 5432
                    <ChevronDown size={16} />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={`mt-4 p-4 border ${borderColor} rounded-lg`}>
              <h3 className="font-semibold mb-2">Company Start</h3>
              <p className="text-sm text-gray-500 mb-2">5 team members ($8 / month each) + 100 GB extra storage ($25.00) + 8 extra hours ($32 per 1 hour)</p>
              <div className="flex justify-between text-sm">
                <span>ID number</span>
                <span>Date paid</span>
                <span>Amount due</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>EKG2SJFN</span>
                <span>Apr 10, 2020</span>
                <span>$250.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className={`${cardBgColor} rounded-lg shadow p-6`}>
            <h2 className="text-xl font-semibold mb-4">Payment information</h2>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CreditCard className="mr-2" />
                <span>Mastercard 5432</span>
              </div>
              <span className="text-sm text-gray-500">Exp. date 12/24</span>
            </div>
            <div className="flex items-start">
              <MapPin className="mr-2 mt-1 flex-shrink-0" />
              <div className="flex-grow">
                <p>Elsie Saunders</p>
                <p>46 Mill Pond Dr.</p>
                <p>New Rochelle, NY 10801</p>
              </div>
              <Edit2 className="ml-2 cursor-pointer flex-shrink-0" />
            </div>
          </div>
          <div className={`${cardBgColor} rounded-lg shadow p-6`}>
            <h2 className="text-xl font-semibold mb-4">Credits</h2>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-1">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-sm text-gray-500">Using 250 from 1500 included</p>
            </div>
            <p className="text-center mb-4">Expand Credits to get more space!</p>
            <button className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
              Buy Credits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage2;