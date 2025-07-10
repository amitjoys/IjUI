import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatsCard = ({ title, value, change, trend, icon: Icon, isDarkMode }) => {
  return (
    <Card className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center text-sm ${
          trend === 'up' ? 'text-green-500' : 'text-red-500'
        }`}>
          {trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          <span className="ml-1">{change}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;