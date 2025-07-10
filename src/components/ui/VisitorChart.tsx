import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VisitorChart = ({ data, isDarkMode }) => {
  return (
    <Card className={`mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <CardHeader>
        <CardTitle>Visitor Traffic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="date" 
                stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
              />
              <YAxis 
                stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  color: isDarkMode ? '#ffffff' : '#000000'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="visitors" 
                stroke="#3b82f6" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorChart;