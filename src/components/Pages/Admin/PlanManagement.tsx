import React, { useState } from 'react';
import { 
  Crown, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X,
  DollarSign,
  Users,
  Zap,
  Star,
  Shield,
  Infinity
} from 'lucide-react';
import type { ComponentProps } from '../../../types';

interface PlanManagementProps extends ComponentProps {}

const PlanManagement: React.FC<PlanManagementProps> = ({ isDarkMode }) => {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const plans = [
    {
      id: 1,
      name: 'Basic',
      price: 29,
      billingCycle: 'month',
      description: 'Perfect for individuals and small teams',
      features: [
        { name: '500 credits per month', included: true },
        { name: 'Basic search filters', included: true },
        { name: 'Email support', included: true },
        { name: 'Data export (CSV)', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Custom integrations', included: false },
        { name: 'Priority support', included: false },
        { name: 'Team management', included: false }
      ],
      limits: {
        credits: 500,
        users: 1,
        teams: 0,
        integrations: 0
      },
      subscribers: 1247,
      revenue: 36163,
      status: 'active',
      popular: false
    },
    {
      id: 2,
      name: 'Pro',
      price: 99,
      billingCycle: 'month',
      description: 'Great for growing businesses',
      features: [
        { name: '2,000 credits per month', included: true },
        { name: 'Advanced search filters', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Data export (CSV, JSON)', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Basic integrations', included: true },
        { name: 'Team management (up to 5)', included: true },
        { name: 'Custom integrations', included: false }
      ],
      limits: {
        credits: 2000,
        users: 5,
        teams: 1,
        integrations: 3
      },
      subscribers: 823,
      revenue: 81477,
      status: 'active',
      popular: true
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 299,
      billingCycle: 'month',
      description: 'For large organizations',
      features: [
        { name: '10,000 credits per month', included: true },
        { name: 'All search filters', included: true },
        { name: '24/7 priority support', included: true },
        { name: 'Data export (All formats)', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Unlimited team management', included: true },
        { name: 'Dedicated account manager', included: true }
      ],
      limits: {
        credits: 10000,
        users: -1, // Unlimited
        teams: -1, // Unlimited
        integrations: -1 // Unlimited
      },
      subscribers: 156,
      revenue: 46644,
      status: 'active',
      popular: false
    }
  ];

  const formatLimit = (value: number) => {
    return value === -1 ? 'Unlimited' : value.toLocaleString();
  };

  const getPlanColor = (planName: string) => {
    switch (planName) {
      case 'Basic': return 'from-gray-500 to-gray-600';
      case 'Pro': return 'from-blue-500 to-blue-600';
      case 'Enterprise': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Plan Management
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage subscription plans and pricing
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Create Plan</span>
        </button>
      </div>

      {/* Plans Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className={`${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-xl border p-6 relative overflow-hidden hover:shadow-lg transition-shadow`}>
            
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-1 -right-1">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-xs font-medium flex items-center space-x-1">
                  <Star size={12} />
                  <span>Popular</span>
                </div>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${getPlanColor(plan.name)} flex items-center justify-center`}>
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                {plan.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center space-x-1">
                <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${plan.price}
                </span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  /{plan.billingCycle}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Subscribers
                </span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {plan.subscribers.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Monthly Revenue
                </span>
                <span className={`font-medium text-green-600`}>
                  ${plan.revenue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Status
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  plan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {plan.status}
                </span>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-2 mb-6">
              <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Key Features
              </h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Zap size={14} className="text-blue-500" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {formatLimit(plan.limits.credits)} credits
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={14} className="text-green-500" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {formatLimit(plan.limits.users)} users
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield size={14} className="text-purple-500" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {formatLimit(plan.limits.integrations)} integrations
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setSelectedPlan(plan);
                  setShowPlanModal(true);
                }}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Edit size={14} className="inline mr-2" />
                Edit
              </button>
              <button className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-red-600'
              }`}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Plan Detail Modal */}
      {showPlanModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getPlanColor(selectedPlan.name)} flex items-center justify-center`}>
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedPlan.name} Plan
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    ${selectedPlan.price}/{selectedPlan.billingCycle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPlanModal(false)}
                className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Plan Details */}
              <div>
                <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Plan Details
                </h4>
                <div className="space-y-4">
                  <div className={`${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } rounded-lg p-4`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign size={16} className="text-green-500" />
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Revenue
                      </span>
                    </div>
                    <p className={`text-2xl font-bold text-green-600`}>
                      ${selectedPlan.revenue.toLocaleString()}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      per month
                    </p>
                  </div>
                  <div className={`${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } rounded-lg p-4`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Users size={16} className="text-blue-500" />
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Subscribers
                      </span>
                    </div>
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedPlan.subscribers.toLocaleString()}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      active users
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Features
                </h4>
                <div className="space-y-3">
                  {selectedPlan.features.map((feature: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        feature.included ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {feature.included ? <Check size={12} /> : <X size={12} />}
                      </div>
                      <span className={`text-sm ${
                        feature.included 
                          ? isDarkMode ? 'text-white' : 'text-gray-900'
                          : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowPlanModal(false)}
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

      {/* Create Plan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Create New Plan
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Plan Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter plan name"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="29"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Description
                </label>
                <textarea
                  placeholder="Plan description"
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Credits
                  </label>
                  <input
                    type="number"
                    placeholder="500"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Max Users
                  </label>
                  <input
                    type="number"
                    placeholder="1"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Max Teams
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
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
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanManagement;