import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TopPages = ({ pages, isDarkMode }) => {
  return (
    <Card className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pages.map((page, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {page.page}
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-medium">{page.views}</span>
                <span className="text-green-500 text-sm">{page.change}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPages;