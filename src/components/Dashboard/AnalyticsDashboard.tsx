import React, { useState, useMemo, memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Users, Globe, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { ComponentProps } from '../../types';

interface AnalyticsDashboardProps extends ComponentProps {}

const StatCard = memo<{
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
  isDarkMode: boolean;
}>(({ title, value, change, trend, icon: Icon, isDarkMode }) => (
  <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</span>
      <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </div>
    <div className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{value}</div>
    <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
      {trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
      <span className="ml-1">{change}</span>
    </div>
  </div>
));

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = memo(({ isDarkMode }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedWebsite, setSelectedWebsite] = useState('example.com');

  const websiteList = useMemo(() => ['example.com', 'test.com', 'demo.com'], []);
  
  const visitorData = useMemo(() => [
    { date: 'Mon', visitors: 120 },
    { date: 'Tue', visitors: 150 },
    { date: 'Wed', visitors: 180 },
    { date: 'Thu', visitors: 170 },
    { date: 'Fri', visitors: 160 },
    { date: 'Sat', visitors: 190 },
    { date: 'Sun', visitors: 200 },
  ], []);

  const stats = useMemo(() => [
    {
      title: 'Total Visitors',
      value: '2,847',
      change: '+12.5%',
      trend: 'up' as const,
      icon: Users
    },
    {
      title: 'Average Time',
      value: '4m 38s',
      change: '-2.1%',
      trend: 'down' as const,
      icon: Clock
    },
    {
      title: 'Page Views',
      value: '12,384',
      change: '+8.2%',
      trend: 'up' as const,
      icon: Globe
    }
  ], []);

  const websiteStats = useMemo(() => ({
    topPages: [
      { page: '/home', views: 1240, change: '+14%' },
      { page: '/products', views: 984, change: '+9%' },
      { page: '/blog', views: 856, change: '+11%' },
    ],
    trafficSources: [
      { source: 'Direct', percentage: 40 },
      { source: 'Search', percentage: 35 },
      { source: 'Social', percentage: 25 },
    ]
  }), []);

  const chartColors = useMemo(() => ({
    grid: isDarkMode ? '#374151' : '#e5e7eb',
    axis: isDarkMode ? '#9ca3af' : '#6b7280',
    background: isDarkMode ? '#1f2937' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#000000'
  }), [isDarkMode]);

  return (
    <div className={`p-6 min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedWebsite}
              onChange={(e) => setSelectedWebsite(e.target.value)}
              className={`px-4 py-2 rounded-lg border transition-fast ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-200'
              }`}
            >
              {websiteList.map(site => (
                <option key={site} value={site}>{site}</option>
              ))}
            </select>
            
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className={`px-4 py-2 rounded-lg border transition-fast ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} isDarkMode={isDarkMode} />
          ))}
        </div>

        {/* Chart */}
        <div className={`p-6 rounded-lg mb-8 shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-lg font-semibold mb-4">Visitor Traffic</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="date" stroke={chartColors.axis} />
                <YAxis stroke={chartColors.axis} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartColors.background,
                    border: 'none',
                    borderRadius: '8px',
                    color: chartColors.text
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-lg font-semibold mb-4">Top Pages</h2>
            <div className="space-y-4">
              {websiteStats.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                    {page.page}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{page.views.toLocaleString()}</span>
                    <span className="text-green-500 text-sm">{page.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
            <div className="space-y-4">
              {websiteStats.trafficSources.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{source.source}</span>
                    <span className="font-medium">{source.percentage}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AnalyticsDashboard.displayName = 'AnalyticsDashboard';

export default AnalyticsDashboard;